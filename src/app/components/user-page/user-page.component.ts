import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interface';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  userData!: User;
  userId!: string;
  clicked = false;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.userId = val['id'];
    });
    this.getData();
  }

  getData() {
    return this.userService.getUserById(this.userId).subscribe((res) => {
      this.userData = res;
    });
  }
  editUser(id: string) {
    this.router.navigate([`/edit/${id}`]);
  }
  goBack() {
    this.router.navigate([`/`]);
  }
}
