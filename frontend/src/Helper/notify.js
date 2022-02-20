import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';


const Notify = (type,mesg) => {

            switch (type) {
                case 'info':
                    NotificationManager.info(mesg);
                    break;
                case 'success':
                    NotificationManager.success(mesg);
                    break;
                case 'warning':
                    NotificationManager.warning(mesg);
                    break;
                case 'error':
                    NotificationManager.error(mesg);
                    break;
            }

    };

export default Notify;