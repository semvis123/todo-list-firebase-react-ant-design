import React, { useState, useEffect } from 'react';
import Title from 'antd/lib/typography/Title';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import QueueAnim from 'rc-queue-anim';
import { accountState } from '../recoil/atoms';
import { useRecoilValue } from 'recoil';
import { SettingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Popconfirm, List, message, Input } from 'antd';
import { firebase } from '../firebaseConfig';

const TodoList = (props: any) => {


  const [tasks, setTasks] = useState([]);
  const [addTasksField, setAddTasksField] = useState("");
  let account = useRecoilValue(accountState);
  let db = firebase.firestore();
  useEffect(() => {
    if (account.uid) {
      console.log('logged in');
      db.collection('users').doc(account.uid).get().then(function (querySnapshot) {
        if (querySnapshot.data()) {
          setTasks(querySnapshot.data().tasks);
          console.log(querySnapshot.data());
        } else {
          db.collection('users').doc(account.uid).set({ tasks: [] });
        }

      });
    } else {
      console.log('not logged in');
      // get the tasks stored in localStorage
      let localTasks = localStorage.getItem('tasks');
      if (localTasks === null || localTasks === '') {
        localStorage.setItem('tasks', JSON.stringify([]));
      } else {
        setTasks(JSON.parse(localTasks));
      }

    }

  }, [(account.uid==undefined)]);
  function pushToDB(tasks) {
    if (account.uid) {
      console.log(tasks);
      db.collection('users').doc(account.uid).set({ tasks: tasks });
    } else {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }

  return (
    <List header={
      <Input.Search placeholder="Vul hier je taak in..."
        enterButton={<Button icon={<PlusOutlined />}>toevoegen</Button>}
        onChange={(e) => setAddTasksField(e.target.value)}
        value={addTasksField}
        onSearch={() => setTasks(currentTasks => {
          if (addTasksField !== "") {
            currentTasks.push(addTasksField); setAddTasksField("");
            pushToDB(currentTasks);
          } return currentTasks
        })} />
    }
      locale={{ emptyText: 'Geen taken :(' }}
      bordered={true}
      dataSource={tasks}
      renderItem={(item: any, index1: any) => (<List.Item key={"item" + index1} actions={[
        <Popconfirm placement="leftTop" title="Wilt u deze taak verwijderen?" onConfirm={(e) => {
          message.success('Succesvol verwijderd');
          setTasks((currentTasks) => {
            currentTasks = currentTasks.filter((el, index) => index !== index1)
            pushToDB(currentTasks);
            return currentTasks;
          }
          );
        }} onCancel={() => message.warn("Verwijderen geannuleerd")}>
          <Button>Verwijderen</Button>
        </Popconfirm>
      ]}>{item}</List.Item>
      )} />
  )
}



function Home() {
  let account = useRecoilValue(accountState);
  return (
    <div>
      {!account.uid && <p>Currently not signed in, you can get free cloud storage and cloud syncing if you login.</p>}
      <TodoList num="1" />
    </div>
  );
}

export default Home;