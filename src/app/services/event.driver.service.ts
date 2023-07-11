import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {ActionEvent} from "../state/product.state";

@Injectable({providedIn:"root"})
export class EventDriverService {

  //create subject
  sourceEventSubject: Subject<ActionEvent> = new Subject();
  //create observable
  sourceEventSubjectObservable = this.sourceEventSubject.asObservable();

  public publishEvent(event: ActionEvent) {
    this.sourceEventSubject.next(event);
  }

}
