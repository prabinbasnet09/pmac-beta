import React, { useEffect } from 'react';
import { ActiveUser } from '../pages/_app.js'
import { useContext, useState} from 'react';

import { updateUser } from '@/graphql/mutations.js';
import { onUpdateUser } from '@/graphql/subscriptions.js';
import { API } from '@aws-amplify/api';

export default function AppUsers(){
    const activeUser = useContext(ActiveUser);
    const [users, setUsers] = useState(activeUser.users);
     
    let groupList = ['Student', 'Faculty', 'Chair Committee'];

    useEffect(() => {
        
        const updateUser = API.graphql({
            query: onUpdateUser,
            authMode: 'AMAZON_COGNITO_USER_POOLS',
          }).subscribe({
            next: (userData) => {
            setUsers((prevUsers) => {
                return prevUsers.map((user) => {
                    if(user.id === userData.value.data.onUpdateUser.id){
                        return userData.value.data.onUpdateUser;
                    }
                    else{
                        return user;
                    }
                })
            })
        }})
        

          return () => {
            updateUser.unsubscribe();
          }
    }, [])

    const handleUserVerification = async (e, user) => {
        e.preventDefault();
        try{
            await API.graphql({
                query: updateUser,
                variables: {
                    input: {
                        id: user.id,
                        verified: true
                    }
                },
                authMode: 'AMAZON_COGNITO_USER_POOLS'
            })
            .then((res) => {
                console.log(res);
            }
            )
            .catch((err) => {
                console.log(err);
            }
            )
        } catch (err) {
            console.log(err);
        }
    }

    const handleGroup = async (e, group, user) => {
        e.preventDefault();
        try{
            await API.graphql({
                query: updateUser,
                variables: {
                    input: {
                        id: user.id,
                        groups: [group]
                    }
                },
            })
            .then((res) => {
                console.log(res);
            }
            )
            .catch((err) => {
                console.log(err);
            }
            )
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            { activeUser.group[0] === 'Admin' ? 
                            <>
                                <th scope="col" className="px-6 py-3">
                                    Group
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Verified
                                </th>
                            </> :
                            <>
                            <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Application
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Notify Users
                                </th>
                            </>
                            }
                            
                        </tr>
                    </thead>
                    <tbody>
                    {users.filter(user => 
                        {
                            return(
                            activeUser.group === "Admin" ?
                            user.groups[0] !== "Admin" :
                            user.groups[0] === "Student")
                        })
                        .map((user) => {
                        return (
                            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={user.id}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                                    {user.name}
                                </th>
                                <td className="px-6 py-4">
                                    {user.username}
                                </td>
                                <td className="px-6 py-4">
                                    {user.email}
                                </td>
                        
                        {/* ONLY ADMIN */}
                        { activeUser.group[0] === 'Admin' ? 
                        <>
                            <td className="px-6 py-4">
                                <select name="plan" id="plan">
                                    <option onClick={(e) => handleGroup(e, 'Student', user)}>{user.groups[0]}</option>
                                    {
                                        groupList.filter((group) => group != user.groups[0]).map((group) => ( 
                                            <option key={group} onClick={(e) => handleGroup(e, group, user)}>{group}</option>))
                                    }
                                </select>
                            </td>
                            <td className="px-6 py-4">
                            {
                                user.verified ? 
                                <button className="p-2 bg-[rgb(93,235,100)] text-[rgb(255,255,255) rounded-lg disabled:">Complete</button> :
                                <button className="p-2 bg-[rgb(245,142,58)] text-[rgb(255,255,255) rounded-lg" onClick={(e) => handleUserVerification(e, user)}>
                                    Click to verify
                                </button> 
                            }
                            </td>
                        </> :
                        <>
                            <td className="px-6 py-4">
                                
                                {user.verified ?
                                    <button className="p-2 bg-[rgb(93,235,100)] text-[rgb(255,255,255) rounded-lg">Complete</button> 
                                    :
                                    <button className="p-2 bg-[rgb(252,132,132)] text-[rgb(255,255,255) rounded-lg">Incomplete</button> 
                                }
                            </td>
                            <td className="px-6 py-4">
                                <button className="p-2 bg-[rgb(183,248,157)] text-[rgb(255,255,255) rounded-lg">View</button> 
                            </td>
                            <td className="px-6 py-4">
                                <button className="p-2 bg-[rgb(247,190,144)] text-[rgb(255,255,255) rounded-lg">Notify</button> 
                            </td>
                        </>

                        }
                        {/* ONLY ADMIN */}



                        </tr>
                    )})}

                    </tbody>
                </table>
            </div>

        </div>
    )
}