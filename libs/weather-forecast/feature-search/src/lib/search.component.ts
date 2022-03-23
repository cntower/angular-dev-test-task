import {Component, OnInit} from '@angular/core';
import {SearchFacade} from '../../../domain/src/lib/application/search.facade';

@Component({
	selector: 'bp-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

	constructor(private searchFacade: SearchFacade) {
	}

	ngOnInit(): void {
		console.log(this.searchFacade.test);
	}

}
