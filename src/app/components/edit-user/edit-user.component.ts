import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../interface';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  user!: User;
  submitted = false;
  eSub!: Subscription;
  routeSub!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.userService.getUserById(params['id']);
        })
      )
      .subscribe((user: User) => {
        this.user = user;
        this.form = new FormGroup({
          name: new FormControl(user.name, Validators.required),
          phoneNumbers: new FormArray([]),
          numbers: new FormControl(user.phoneNumbers),
        });
      });
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
  ngOnDestroy(): void {
    if (this.eSub) {
      this.eSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    let numberArray = this.userService.getPhoneNumbersArray(
      this.form.controls['phoneNumbers'].value
    );
    const editUser: User = {
      id: this.user.id,
      name: this.form.value.name,
      phoneNumbers: [...this.user.phoneNumbers, numberArray],
    };
    this.eSub = this.userService.updateUser(editUser).subscribe(() => {
      alert('User Edited');
    });
  }
  goBack(id: string) {
    this.router.navigate(['user', id]);
  }
}
