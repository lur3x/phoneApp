import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  form!: FormGroup;
  numbers: string[] = [];

  constructor(private route: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phoneNumbers: new FormControl('', [Validators.required]),
      phoneNumbersAdd: new FormControl(''),
    });
  }
  submit() {
    const newUser: User = {
      id: '',
      name: this.form.controls['name'].value,
      phoneNumbers: [
        this.form.controls['phoneNumbers'].value,
        this.form.controls['phoneNumbersAdd'].value,
      ],
    };
    return this.userService.addUser(newUser).subscribe(() => {
      this.form.reset();
      alert('User added');
    });
  }
  return() {
    this.route.navigate(['/']);
  }
}
