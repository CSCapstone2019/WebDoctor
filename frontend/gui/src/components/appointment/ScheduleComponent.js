import React, { Component } from 'react';
import {
  Inject,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  EventSettingsModel,
  ScheduleComponent
} from '@syncfusion/ej2-react-schedule';
// import { Adaptor, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { Dropdown } from 'antd';

class Schedule extends Component {
  localData: EventSettingsModel = {
    dataSource: [
      {
        End: new Date(2019, 10, 11, 4, 30),
        Start: new Date(2019, 10, 11, 4, 0),
        Summary: '',
        IsAllDay: true,
        IsReadonly: true
      },
      {
        End: new Date(2019, 10, 12, 4, 30),
        Start: new Date(2019, 10, 12, 4, 0)
      },
      {
        Patient: 'Phil',
        End: new Date(2019, 10, 16, 4, 30),
        Start: new Date(2019, 10, 16, 4, 0)
      }
    ],
    //Renaming fields
    fields: {
      subject: { name: 'Summary', default: 'No title provided.' },
      startTime: { name: 'Start' },
      endTime: { name: 'End' }
    }
  };

  // remoteData = new DataManager({
  //   url: 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
  //   adaptor: new WebApiAdaptor,
  //   crossDomain: true
  // });

  // Custom Add Event editor
  // All custom components must have e-field in className

  editorWindowTemplate(props: any): JSX.Element {
    return (
      <table className="custom-event-editor" style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td className="e-textlabel">Summary</td>
            {/* must match data source above */}
            <td>
              <input
                className="e-field e-input"
                id="Summary"
                name="Subject"
                type="text"
                style={{ width: '100%' }}
              ></input>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Patient</td>
            <td>
              <DropDownListComponent
                className="e-field"
                id="Patient"
                dataSource={['Joe', 'Phil']}
                placeholder="Choose Patient"
                data-name="Patient"
                value={props.Patient || null}
                style={{ width: '100%' }}
              ></DropDownListComponent>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">From</td>
            <td>
              <DateTimePickerComponent
                className="e-field"
                id="StartTime"
                data-name="StartTime"
                value={new Date(props.startTime || props.StartTime)}
                format="dd/MM/yy hh:mm a"
              ></DateTimePickerComponent>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">To</td>
            <td>
              <DateTimePickerComponent
                className="e-field"
                id="EndTime"
                data-name="EndTime"
                value={new Date(props.endTime || props.EndTime)}
                format="dd/MM/yy hh:mm a"
              ></DateTimePickerComponent>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel"></td>
            <td>
              <textarea
                className="e-field e-input"
                id="Description"
                name="Description"
                rows={3}
                cols={50}
                style={{
                  width: '100%',
                  height: '60px !important',
                  resize: 'vertical'
                }}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  render() {
    return (
      //eventSettings={this.localData}
      //eventSettings={{ dataSource: this.remoteData }}
      //height = '' width = ''
      <ScheduleComponent
        currentView="Month"
        eventSettings={this.localData}
        editorTemplate={this.editorWindowTemplate.bind(this)}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    );
  }
}

export default Schedule;
