import React, { Component } from 'react';
import { 
  Inject,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  EventSettingsModel,
  ScheduleComponent } from '@syncfusion/ej2-react-schedule';
import { Adaptor, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

class Schedule extends Component {
  localData: EventSettingsModel = {
    dataSource: [
      {
        End: new Date(2019, 10, 11, 4, 30),
        Start: new Date(2019, 10, 11, 4, 0),
        Summary: "",
        IsAllDay: true,
        IsReadonly: true,
      },
      {
        End: new Date(2019, 10, 12, 4, 30),
        Start: new Date(2019, 10, 12, 4, 0),
      }
    ],
    //Renaming fields
    fields: {
      subject: { name: "Summary", default: "No title provided." },
      startTime: { name: "Start" },
      endTime: { name: "End" }
    }
  };

  // remoteData = new DataManager({
  //   url: 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
  //   adaptor: new WebApiAdaptor,
  //   crossDomain: true
  // });

  render() {
    return (
      //eventSettings={this.localData}
      //eventSettings={{ dataSource: this.remoteData }}
      //height = '' width = ''
      <ScheduleComponent currentView="Month" eventSettings={this.localData}>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    );
  }
}

export default Schedule;