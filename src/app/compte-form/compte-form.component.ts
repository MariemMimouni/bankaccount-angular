import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompteService } from '../services/compte.service';
import { Compte } from 'src/models/Compte';

@Component({
  selector: 'app-compte-form',
  templateUrl: './compte-form.component.html',
  styleUrls: ['./compte-form.component.css']
})
export class CompteFormComponent implements OnInit {
  newCompte: Compte = { 
    rib: 0, 
    nomClient: '',
    solde: 0, 
    user: { username: '', id: 0, password: '' } 
  };
  editMode: boolean = false;
  selectedRib: number | null = null;
  users: any[] = [];   // Store the list of users


  constructor(
    private compteService: CompteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.compteService.getAllUsers().subscribe((data) => {
      this.users = data;  // Store the users fetched from the backend
    });
    console.log(this.users);
      if (params['rib']) {
        this.selectedRib = +params['rib'];
        this.editMode = true;
        this.loadCompte(this.selectedRib);
      }
    });
  }
  onUsernameChange(): void {
    const selectedUser = this.users.find(user => user.username === this.newCompte.nomClient);
    if (selectedUser) {
      this.newCompte.user = { id: selectedUser.id };  // Update userId
    }
  }

  loadCompte(rib: number): void {
    this.compteService.getCompteByRib(rib).subscribe(
      (compte: Compte) => {
        this.newCompte = { ...compte };
      },
      (error: any) => {
        console.error('Error loading compte:', error);
      }
    );
  }

  saveCompte(): void {
    if (this.editMode && this.selectedRib !== null) {
      this.compteService.updateCompte(this.selectedRib, this.newCompte.solde).subscribe({
        next: () => this.router.navigate(['/compte']),
        error: (err) => console.error('Error updating compte:', err)
      });
    } else {
      this.compteService.saveCompte(this.newCompte.rib, this.newCompte.solde, this.newCompte.user.id).subscribe({
        next: () => this.router.navigate(['/compte']),
        error: (err) => console.error('Error saving compte:', err)
      });
    }
  }

  resetForm(): void {
    this.newCompte = { 
      rib: 0, 
      nomClient: '',
      solde: 0, 
      user: { username: '', id: 0, password: '' } 
    };
    this.editMode = false;
    this.selectedRib = null;
  }
  generateRib(): void {
    const rib = Math.floor(Math.random() * 9000000) + 1000000; // Generate a 7-digit number
    this.newCompte.rib = rib;
  }
}
