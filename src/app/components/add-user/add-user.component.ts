import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  aSub!: Subscription;

  constructor(private route: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phoneNumbers: new FormArray([]),
    });
  }
  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  get numbers() {
    return this.form.controls['phoneNumbers'] as FormArray;
  }

  addNumber() {
    const numberForm = new FormGroup({
      number: new FormControl('', Validators.required),
    });
    this.numbers.push(numberForm);
  }

  deleteNumber(numberIndex: number) {
    this.numbers.removeAt(numberIndex);
  }

  submit() {
    let numberArray = this.userService.getPhoneNumbersArray(
      this.form.controls['phoneNumbers'].value
    );
    const newUser: User = {
      id: '',
      name: this.form.controls['name'].value,
      phoneNumbers: numberArray,
    };
    this.aSub = this.userService.addUser(newUser).subscribe(() => {
      console.log(numberArray);
      this.form.reset();
      alert('User added');
    });
  }
  return() {
    this.route.navigate(['/']);
  }
}
