import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router,ParamMap,Params  } from '@angular/router';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {SedeService} from '../sede.service';
import {Sede} from '../sede';
import { element } from 'protractor';

declare var google:any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  @ViewChild('map', {static:false}) mapRef:ElementRef; //declarar map para se usado
  map:any;

  sedes:Sede[]=[];
  constructor(private sedeService: SedeService,
    private geolocation:Geolocation,  private router: Router) { }

  getSedes():void{
    this.sedeService.getSedes().subscribe(sedes => {
      this.sedes = sedes;
      this.sedes.forEach(element => {
        console.log(element);
        const marcador = new google.maps.LatLng(element.latitud, element.longitud);
        this.agregarMarcador(marcador, this.map, element.nombre, false,true);
      })
    })
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.mostrarMapa();
    this.getSedes();
  }

  
  mostrarMapa(){
    const ubicacion = new google.maps.LatLng( 2.44, -76.61); //lat y long
    const opciones={
      center:ubicacion,
      zoom: 14
    }
    this.map= new google.maps.Map(this.mapRef.nativeElement, opciones);
  //this.agregarMarcador(ubicacion, this.map,"Municipio de Piendamo", false, google.maps.Animation.DROP);
    this.obtenerPosicion(this.map);

    
    this.map.addListener("click", (e) => {
      alert (e.latLng.lat()+";"+e.latLng.lng());
      console.log(e.latLng.lat()+";"+e.latLng.lng());
      this.router.navigate(['tabs/nuevasede/'+e.latLng.lat()+'/'+e.latLng.lng()]);
    });
  
  }

  agregarMarcador(posicion, mapa, titulo, dragable,iconn){
    if(iconn == false){
      const opcionesMarcador={
        position:posicion,
        draggable:dragable,
        animation: google.maps.Animation.BOUNCE,
        map:mapa,
        title:titulo
      };
      var marca = new google.maps.Marker(opcionesMarcador);
      return marca;
    }else{
      const svgMarker = {
        path:
          "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
        fillColor: "blue",
        fillOpacity: 0.6,
        strokeWeight: 0,
        rotation: 0,
        scale: 2,
        anchor: new google.maps.Point(15, 30),
      };
    
      const opcionesMarcador={
        position:posicion,
        draggable:dragable,
        map:mapa,
        title:titulo,
        icon:svgMarker
      };
      var marca = new google.maps.Marker(opcionesMarcador);
      return marca;
    }
    
  }

  obtenerPosicion(mapa):any{
    this.geolocation.getCurrentPosition().then(response =>{
      const actual= new google.maps.LatLng(response.coords.latitude,response.coords.longitude);
      this.agregarMarcador(actual, this.map, "Mi posición", false,false);
    }).catch(error =>{
      console.log(error);
    });
  }
}
