import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompteService } from '../services/compte.service';
import { Compte } from 'src/models/Compte';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {
  comptes: Compte[] = [];

  constructor(private compteService: CompteService,private AuthService:AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fetchComptes();

  }
  logout():void{
    this.AuthService.logout();
  }


  fetchComptes(): void {
    this.compteService.getAllComptes().subscribe({
      next: (data: Compte[]) => {
        console.log('Fetched comptes:', data);
        this.comptes = data;
      },
      error: (error: any) => {
        console.error('Error fetching comptes:', error);
        this.showErrorAlert('Error fetching comptes. Please try again.');
      }
    });
  }

  deleteCompte(rib: number): void {
    this.compteService.deleteCompte(rib).subscribe({
      next: () => {
        this.comptes = this.comptes.filter(compte => compte.rib !== rib);
      },
      error: (error: any) => {
        this.showErrorAlert('Error deleting compte. Please try again.');
      }
    });
  }

  editCompte(rib: number): void {
    this.router.navigate(['/compte-form', rib]);
  }

  addCompte(): void {
    this.router.navigate(['/compte-form']);
  }
  navigateToClients(): void {
    console.log('Navigating to Clients Space');
    this.router.navigate(['/client']);
  }
  deleteCompteAjax(rib: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this compte!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.compteService.deleteCompte(rib).subscribe({
          next: () => {
            this.comptes = this.comptes.filter(compte => compte.rib !== rib);
            this.showSuccessAlert('The compte has been deleted successfully!');
          },
          error: (error: any) => {
            this.showErrorAlert('Unable to delete the compte. Please try again.');
          }
        });
      } else {
        Swal.fire({
          title: 'Cancelled',
          text: 'Your compte is safe!',
          icon: 'info'
        });
      }
    });
  }

  private showSuccessAlert(message: string): void {
    Swal.fire({
      title: 'Success!',
      text: message,
      icon: 'success',
      confirmButtonColor: '#3085d6'
    });
  }

  private showErrorAlert(message: string): void {
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonColor: '#d33'
    });
  }
}
