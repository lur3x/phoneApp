import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface';

const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'text/plain, */*',
    'Content-Type': 'application/json',
  }),
  responseType: 'text' as 'json',
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(
    search: string,
    sort: null | 'desc' | 'asc',
    page: number,
    quantity: number
  ) {
    return this.http.get<User[]>(
      `http://localhost:8000/users?search=${search}&sort=${sort}&page=${page}&quantity=${quantity}`
    );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`http://localhost:8000/userbyid/${id}`);
  }
  deleteUser(id: string) {
    return this.http.delete(`http://localhost:8000/deleteuser/${id}`, {
      responseType: 'text',
    });
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(
      'http://localhost:8000/adduser',
      user,
      httpOptions
    );
  }
  updateUser(user: User): Observable<User> {
    console.log(user);
    return this.http.put<User>(
      `http://localhost:8000/updateuser/${user.id}`,
      user,
      httpOptions
    );
  }
}
