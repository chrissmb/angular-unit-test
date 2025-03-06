import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../service/my-service.service';
import { SomeUtil } from '../shared/some-util';
import { OtherService } from '../service/other.service';

@Component({
  selector: 'app-my-component',
  imports: [],
  templateUrl: './my-component.component.html',
  styleUrl: './my-component.component.css'
})
export class MyComponentComponent implements OnInit {

  _content = 'no content';

  constructor(private _myService: MyServiceService, private _otherService: OtherService) {
  }

  ngOnInit(): void {
    this._content = this._myService.getContent();
  }

  get content(): string {
    return this._content;
  }

  getStaticContent(): string {
    return SomeUtil.getContent();
  }

  getOtherServiceContent(): string {
    return this._otherService.getContent();
  }
}
