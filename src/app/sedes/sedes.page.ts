import { Component, OnInit } from '@angular/core';
import {SedeService} from '../../app/sede.service';
import {Sede} from '../../app/sede';

import {NavController, AlertController} from '@ionic/angular';

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.page.html',
  styleUrls: ['./sedes.page.scss'],
})
export class SedesPage implements OnInit {

  sedes: Sede[]=[];
  constructor(private contactoService: SedeService,
    public alertController: AlertController) { }

  getSedes():void{
    this.contactoService.getSedes().subscribe(sedes => this.sedes=sedes);
  }

  ngOnInit():void {  }

  ionViewDidEnter(){
    this.getSedes();
  }

}
