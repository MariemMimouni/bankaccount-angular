import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/client.service';
import { Router } from '@angular/router';
import { ClientFormComponent } from '../client-form/client-form.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  users: any[] = []; // Array to store users

  constructor(private userService: UserService,private AuthService:AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers(); // Fetch users on component initialization
  }
  logout():void{
    this.AuthService.logout();
  }
  navigateToCompte(): void {
    this.router.navigate(['/compte']);
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data: any) => {
        try {
          this.users = JSON.parse(data); // Attempt to parse manually
          console.log('Fetched users:', this.users);
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  

  navigateToAddUser(): void {
    this.router.navigate(['/ajoutclient']);
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      (response) => {
        console.log('User deleted successfully', response);
        this.loadUsers(); // Reload the users list after deletion
      },
      (error) => {
        console.error('Error deleting user', error);
      }
    );
  }

  deleteUserAjax(id: number): void {
    this.userService.deleteUserAjax(id).subscribe(
      (response) => {
        console.log('User deleted successfully via AJAX', response);
        this.loadUsers(); // Reload the users list after deletion
      },
      (error) => {
        console.error('Error deleting user via AJAX', error);
      }
    );
  }
}
