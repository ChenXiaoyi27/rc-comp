import React from 'react';
import MatterCalendar from '../components/matter-calendar';
import mockData from './mock/matters';

export default class MatterCalendarDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return <div>
            <MatterCalendar matters={mockData} />
        </div>
    }
}
export { MatterCalendarDemo };