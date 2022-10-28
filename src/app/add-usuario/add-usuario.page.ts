import { Api } from './../../services/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {

  nome: string = "";
  cpf: string = "";
  email: string = "";
  senha: string = "";
  nivel: string = "";
  id: string = "";

  antigo: string = "";
  antigo2: string = "";

  constructor(
    private router:Router,
    private provider:Api,
    private actRouter:ActivatedRoute,
    public toast: ToastController
  ) { }

  ngOnInit() {
    this.limparCampos();
    //receber e enviar parametros entre páginas
    this.actRouter.params.subscribe((data:any)=>{
      this.id = data.id;
      this.nome = data.nome;
      this.cpf = data.cpf;
      this.email = data.email;
      this.nivel = data.nivel;

      this.antigo = data.email;
      this.antigo2 = data.cpf;
    });
  }

  async Mensagem(mensagem,cor){
    const toast = await this.toast.create({
      message: mensagem,
      duration: 2000,
      color: cor
    });
    toast.present();
  }

  Usuarios(){
    this.router.navigate(['/usuarios']);
  }

  cadastrar(){
    return new Promise(resolve => {
      let dados = {
        nome: this.nome,
        email: this.email,
        cpf: this.cpf,
        senha: this.senha,
        nivel: this.nivel,
        id: this.id,
        antigo: this.antigo,
        antigo2: this.antigo2,
      };
      this.provider.dadosApi(dados, 'usuarios/inserir.php').subscribe(
        data=>{

          if(data['sucesso']==true){

            this.Mensagem(data['mensagem'], 'success');

            this.limparCampos();

            this.router.navigate(['/usuarios']);
          }else{
            this.Mensagem(data['mensagem'], 'danger');

          }
          
        }
      );
    });
  }

  limparCampos(){
    this.nome = '';
    this.email = '';
    this.cpf = '';
    this.nivel = '';
    this.senha = '';
  }

}
