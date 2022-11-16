import Pusher from 'pusher';
import ClientPusher from 'pusher-js';


export const serverPusher = new Pusher({
  appId: "1508076",
  key: "849a9e4183bd35cb8e6d",
  secret: "0af16b18e6a9a47184dd",
  cluster: "ap2",
  useTLS: true
});;


export const clientPusher = new ClientPusher('849a9e4183bd35cb8e6d', {
    cluster: 'ap2',
});