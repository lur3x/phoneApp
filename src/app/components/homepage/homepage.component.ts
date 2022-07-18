import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/interface';
import { UserService } from 'src/app/services/user.service';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  users: User[] = [];
  tSub!: Subscription;
  delSub!: Subscription;
  amount = 15;
  pageSize = 10;
  sorting: null | 'desc' | 'asc' = null;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'id',
    'name',
    'phoneNumbers',
    'stuff',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.getTableData();
  }
  ngOnDestroy(): void {
    if (this.tSub) {
      this.tSub.unsubscribe;
    }
    if (this.delSub) {
      this.delSub.unsubscribe();
    }
  }

  getTableData() {
    this.tSub = this.userService
      .getUsers('', this.sorting, 1, this.amount)
      .subscribe((user: any) => {
        this.dataSource = new MatTableDataSource(user['users']);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  goToDetails(id: number) {
    return this.router.navigate(['/user', id]);
  }
  deleteUser(id: string) {
    this.delSub = this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter((user) => {
        user.id != id;
      });
      alert('User Deleted');
      this.ngOnInit();
    });
  }
  openAddUser() {
    return this.router.navigate(['/add']);
  }

  showNumbers(num: number) {
    this.amount = num;
    this.ngOnInit();
  }

  sortType(type: any) {
    this.sorting = type ? type : null;
    this.ngOnInit();
  }
}
