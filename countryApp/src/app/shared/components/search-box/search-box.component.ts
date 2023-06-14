import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private dbouncer: Subject<string> = new Subject<string>();
  private dboucersuscription?: Subscription;

  @Input()
  public placeholder: string ="";

  @Input()
  public initialValue:string ="";

  @Output()
  public onValue =  new EventEmitter<string>();

  @Output()
  public onDebounce =  new EventEmitter<string>();

  emitValue( value: string ): void {
    this.onValue.emit ( value )
  }

  ngOnInit(): void {
    this.dboucersuscription = this.dbouncer
      .pipe(
        debounceTime(500)
      )
      .subscribe( value => {
        this.onDebounce.emit(value);
    })
  }

  ngOnDestroy(): void {
    this.dboucersuscription?.unsubscribe();
  }

  onKeyPress( searchTerm: string) {
    this.dbouncer.next( searchTerm );
  }

}
