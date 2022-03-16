import React, { useRef } from 'react';
import logo from "../logo.png";
import axios from 'axios';
import PubSub from 'pubsub-js'
import { FaSearch } from 'react-icons/fa'


function Header() {
    const myRef = useRef();

    const search = e => {
        const keyWord = myRef.current.value;
        e.preventDefault();

        //请求成功后通知List更新状态
        // 发送内容 PubSub.publish('TOPIC', 'hello world!');
        PubSub.publish('github_search', { isFirst: false, isLoading: true });

        axios.get(`https://api.github.com/search/users?q=${keyWord}`).then(
            response => {
                //请求成功后通知List更新状态
                console.log(response);
                PubSub.publish('github_search', { isLoading: false, users: response.data.items });
                console.log('success');
            },
            error => {
                //请求成功后通知List更新状态
                PubSub.publish('github_search', { isLoading: false, err: error.message });
                console.log('fail');
            }
        );
        myRef.current.value = ''
    }
    return (
        < div className="app_header" >
            <div className="app_title">
                <img src={logo} className="app_logo" alt="logo" />
                <h1>Search Github Users</h1>
            </div>

            <form className="app_search">
                <input ref={myRef} type="text" placeholder="search username here..." />
                <button onClick={search} > <FaSearch className='app_icon' /> </button>
            </form>
        </div>
    )
}

export default Header;