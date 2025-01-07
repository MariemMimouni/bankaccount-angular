// src/models/Compte.ts

import { Client } from "./Client";

export interface Compte {
  rib: number;
  nomClient: string;
  solde: number;
  user:  any; // Marked as optional
}
