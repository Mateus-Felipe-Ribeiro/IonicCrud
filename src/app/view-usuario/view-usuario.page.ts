import { Api } from './../../services/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-usuario',
  templateUrl: './view-usuario.page.html',
  styleUrls: ['./view-usuario.page.scss'],
})
export class ViewUsuarioPage implements OnInit {

  nome: string = "";
  cpf: string = "";
  email: string = "";
  nivel: string = "";
  id: string = "";

  constructor(
    private router:Router,
    private provider:Api,
    private actRouter:ActivatedRoute,
  ) { }

  ngOnInit() {
    //receber e enviar parametros entre páginas
    this.actRouter.params.subscribe((data:any)=>{
      this.id = data.id;
      this.nome = data.nome;
      this.cpf = data.cpf;
      this.email = data.email;
      this.nivel = data.nivel;
    });
  }

  Usuarios(){
    this.router.navigate(['/usuarios']);
  }

}
