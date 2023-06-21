import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {


  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, [Validators.minLength(3), Validators.required]);

  constructor(private sevice: TecnicoService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void { }


  create(): void {
    this.sevice.create(this.tecnico).subscribe(() => {
      this.toastr.success('Ténico cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['tecnicos']);
    }, ex => {
      if(ex.error.errors){
        ex.error.errors.forEach(element => {
          this.toastr.error(element.message);
        });
      }else {
        this.toastr.error(ex.error.message);
      }
    })
  }

  addperfil(perfis: any): void {

    if(this.tecnico.perfis.includes(perfis)){
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfis), 1);
    }else {
      this.tecnico.perfis.push(perfis);
    }
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid &&
      this.email.valid && this.senha.valid;
  }

}
