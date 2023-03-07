import React from 'react';
import {useContext} from 'react';
import { ActiveUser } from './_app';

export default function Profile(){
    const activeUser = useContext(ActiveUser);
    return (
        <div>
            <p className='text-lg font-bold'>Profile</p>
            <p>{activeUser.name}</p>
        </div>
    )
}