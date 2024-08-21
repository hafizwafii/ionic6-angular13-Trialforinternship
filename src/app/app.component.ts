import { Component, OnInit } from '@angular/core';
import { CatService } from './cat.service';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  cats: any[] = [];
  filteredCats: any[] = [];
  displayedCats: any[] = []; // Array to hold the cats currently displayed on the page
  searchTerm: string = '';
  filterBy: string = 'breed';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  showBackButton: boolean = false;

  constructor(
    private catService: CatService, 
    private router: Router, 
    private location: Location
  ) {
    // Listen to route changes to decide when to show the back button
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showBackButton = event.urlAfterRedirects !== '/cat-listing';
      }
    });
  }

  ngOnInit(): void {
    this.catService.getBreeds().subscribe(
      (data) => {
        this.cats = data.data;
        this.filteredCats = [...this.cats];
        this.updateDisplayedCats();
      },
      (error) => {
        console.error('Error fetching cat breeds:', error);
      }
    );
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  goBack(): void {
    this.location.back();
  }

  onSearchChange(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredCats = this.cats.filter(cat =>
      cat[this.filterBy].toLowerCase().includes(query)
    );
    this.currentPage = 1; // Reset to the first page after search
    this.updateDisplayedCats();
  }

  onFilterChange(event: any): void {
    this.filterBy = event.detail.value;
    this.onSearchChange({ target: { value: this.searchTerm } });
  }

  updateDisplayedCats(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedCats = this.filteredCats.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.filteredCats.length) {
      this.currentPage++;
      this.updateDisplayedCats();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedCats();
    }
  }
}
