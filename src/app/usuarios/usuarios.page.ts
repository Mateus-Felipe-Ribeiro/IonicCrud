import { ToastController } from '@ionic/angular';
import { Api } from './../../services/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  itens: any = [];
  limit: number = 10;
  start: number = 0;
  nome: string = "";

  constructor(
    private router:Router,
    private provider:Api,
    private actRouter:ActivatedRoute,
    public toast: ToastController
  ) { }

  ngOnInit() {
  }

  addUsuarios(){
    this.router.navigate(['/add-usuario'])
  }

  ionViewWillEnter(){
    this.itens = [];
    this.start = 0;
    this.carregar()
  }

  carregar(){
    return new Promise(resolve => {
      this.itens = [];
      let dados = {
        requisicao : 'listar',
        nome : this.nome,
        limit : this.limit,
        start : this.start
        };

        this.provider.dadosApi(dados, 'usuarios/listar.php').subscribe(data => {

        if(data['result'] == '0') {
          this.ionViewWillEnter();
        }else{
          this.itens = [];
          for(let item of data['result']){
            this.itens.push(item);
            
          }
        }
         
         resolve(true);
         
        });
    });
  }

  editar(id,nome,cpf,email,nivel){
    this.router.navigate(['/add-usuario/'+ id+'/'+nome+'/'+cpf+'/'+email+'/'+nivel])
  }

  async Mensagem(mensagem,cor){
    const toast = await this.toast.create({
      message: mensagem,
      duration: 2000,
      color: cor
    });
    toast.present();
  }

  excluir(id){
    return new Promise(resolve => {
      this.itens = [];
      let dados = {
        id: id,
        };

        this.provider.dadosApi(dados, 'usuarios/excluir.php').subscribe(data => {

          if(data['success']==true){
            this.router.navigate(['usuarios']);
            this.Mensagem(data['mensagem'], 'success');
          }else{
            this.Mensagem(data['mensagem'], 'danger');
          }
        });
    });
  }

  mostrar(id,nome,cpf,email,nivel){
    this.router.navigate(['/view-usuario/'+ id+'/'+nome+'/'+cpf+'/'+email+'/'+nivel])
  }

   //atualizar o list view

 doRefresh(event) {
    
  setTimeout(() => {
    this.ionViewWillEnter();
    event.target.complete();
  }, 500);
}


//barra de rolagem
loadData(event) {

  this.start += this.limit;

  setTimeout(() => {
    this.carregar().then(()=>{ 
      event.target.complete();
     });
   
  }, 500);
  

}

}
