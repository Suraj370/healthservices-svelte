import { writable } from 'svelte/store';

const initialServices = [
  { id: 1, name: 'General Checkup', description: 'Annual physical examination', price: 100 },
  { id: 2, name: 'Dental Cleaning', description: 'Basic dental hygiene service', price: 75 },
];

export const services = writable(initialServices);