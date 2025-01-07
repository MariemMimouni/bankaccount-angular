import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  user = {
    username: '',
    password: ''
  };
  
  isEditMode = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id'); // Ensure this is correctly retrieving the ID from the URL
  
    if (userId) {
      this.isEditMode = true;
      this.loadUserForEdit(userId); // Load the user for editing
    }
  }
  

  loadUserForEdit(id: string): void {
    this.userService.getUserById(id).subscribe(
      (response) => {
        this.user = JSON.parse(response); // if needed, parse the response as an object
        // Populate the form with user data
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  saveUser(): void {
    if (this.isEditMode) {
      this.updateUser(); // If in edit mode, update the user
    } else {
      this.createUser(); // If in add mode, create a new user
    }
  }

  createUser(): void {
    this.userService.saveUser(this.user).subscribe(
      (response) => {
        console.log('User saved successfully', response);
        this.router.navigate(['/client']);
      },
      (error) => {
        console.error('Error saving user', error);
      }
    );
  }

  updateUser(): void {
    this.userService.updateUser(this.user).subscribe(
      (response) => {
        console.log('User updated successfully', response);
        this.router.navigate(['/client']);
      },
      (error) => {
        console.error('Error updating user', error);
      }
    );
  }
}
