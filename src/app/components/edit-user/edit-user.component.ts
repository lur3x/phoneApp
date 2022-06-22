import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../interface';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  form!: FormGroup;
  user!: User;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.userService.getUserById(params['id']);
        })
      )
      .subscribe((user: User) => {
        this.user = user;
        this.form = new FormGroup({
          name: new FormControl(user.name, Validators.required),
          phoneNumbers: new FormControl(user.phoneNumbers[0]),
          phoneNumbersAdd: new FormControl(
            user.phoneNumbers[1] ? user.phoneNumbers[1] : '-'
          ),
        });
      });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const editUser: User = {
      id: this.user.id,
      name: this.form.value.name,
      phoneNumbers: [
        this.form.value.phoneNumbers,
        this.form.value.phoneNumbersAdd,
      ],
    };
    this.userService.updateUser(editUser).subscribe(() => {
      alert('User Edited');
    });
  }
  goBack(id: string) {
    this.router.navigate(['user', id]);
  }
}
