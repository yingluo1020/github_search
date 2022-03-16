import React, { useState, useEffect } from 'react';
import PubSub from 'pubsub-js'

function List() {
    const [data, setData] = useState({
        users: [], //users初始值为数组
        isFirst: true, //是否为第一次打开页面
        isLoading: false, //标识是否处于加载中
        err: '', //存储请求相关的错误信息
    })
    const { users, isFirst, isLoading, err } = data

    useEffect(() => {
        //订阅内容：var token = PubSub.subscribe('TOPIC', (msg, data)=> {});
        //这里本该写成(msg,data),但因为这里用不上msg这个参数，但参数顺序又是固定的，所以就用_来占位   
        const token = PubSub.subscribe('github_search', (_, stateObj) => {
            setData(stateObj)
        })
        return () => { PubSub.unsubscribe(token) }
    }, []);

    return (
        <div className="app_list">{
            isFirst ? <h2> Welcome to Github! </h2> :
                isLoading ? <h2> Loading...... </h2> :
                    err ? <h2 style={{ color: 'red' }}> {err} </h2> :
                        users.map((userObj) => {
                            return (

                                <article key={userObj.id} className="app_card">
                                    <a rel="noreferrer" href={userObj.html_url} target="_blank" >
                                        <img alt="head_portrait" src={userObj.avatar_url} />
                                        <p className="card-text" > {userObj.login} </p>
                                    </a>
                                </article>
                            )
                        })
        }
        </div>
    )
}

export default List;