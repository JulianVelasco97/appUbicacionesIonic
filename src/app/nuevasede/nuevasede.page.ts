import { Component, OnInit } from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators, FormArray, FormGroupName, FormControl} from '@angular/forms';
import {ActivatedRoute, Router, ParamMap, Params} from '@angular/router';
import {SedeService} from '../../app/sede.service';
import {Sede} from '../../app/sede';

@Component({
  selector: 'app-nuevasede',
  templateUrl: './nuevasede.page.html',
  styleUrls: ['./nuevasede.page.scss'],
})
export class NuevasedePage implements OnInit {

  sedes : Sede[];
  sede:Sede;
  nuevoForm : FormGroup;
  isSubmitted = false;
  lat :any;
  lng :any;

  constructor(private route:ActivatedRoute,
    private router: Router, private sedeService:SedeService, 
    public toastController:ToastController,  public formBuilder: FormBuilder
    ) { }
  
  private crearForm(){
    this.nuevoForm = this.formBuilder.group({
      nombre: ['', Validators.required]
    });
  }

  getSedes(): void{
    this.sedeService.getSedes().subscribe(sedes =>this.sedes =sedes);
  }

  regresar(): void{this.router.navigate(['tabs/mapa']);}

  ngOnInit() {
    this.crearForm();
    this.getSedes();
    this.route.params.forEach((params:Params)=>{
      this.lat = params['lat'];
      this.lng = params['lng']
    });
    console.log(this.lng+"hola");
  }

  async mostrarMensaje(mensaje){
    const toast = await this.toastController.create({
      message:mensaje,
      duration:2000
    });
    toast.present();
  }

  guardar(){
    this.isSubmitted=true;
    if(!this.nuevoForm.valid){
      this.mostrarMensaje("Diligenciar todos los campos obligatorios!");
      return false;
    } else{
      this.sede = this.nuevoForm.value
      this.sedeService.crearNueva(this.sede)
      .subscribe(sede=>{
        this.sedes.push(sede);
        this.sede=null;
        this.nuevoForm.controls['nombre'].setValue("");
        sede.latitud=this.lat;
        sede.longitud=this.lng;
        this.mostrarMensaje("sede registrada");
      });
    }
    this.router.navigate(['tabs/sedes']);
  }

}
