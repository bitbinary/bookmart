import React from 'react';
import Euphoric from '../assets/emotings/euphoric.gif';
import Happy from '../assets/emotings/happy.gif';
import Thrilled from '../assets/emotings/thrilled.gif';
import Funny from '../assets/emotings/funny.gif';
import Bored from '../assets/emotings/bored.gif';
import Angry from '../assets/emotings/angry.gif';
import Sad from '../assets/emotings/sad.gif';
import Depressed from '../assets/emotings/depressed.gif';
import Image from './shared/Image';
// Euphoric, Happy, Funny Thrilled, Bored, Angry, Sad, Depressed
export default function Emotings({ variant, id, size = '30px' }) {
  switch (variant) {
    case 'euphoric':
      return (
        <div
          style={{
            height: size,
            width: size,
          }}
        >
          <Image imagePath={Euphoric} />
        </div>
      );
    case 'happy':
      return (
        <div
          style={{
            height: size,
            width: size,
          }}
        >
          <Image imagePath={Happy} />
        </div>
      );
    case 'funny':
      return (
        <div
          style={{
            height: size,
            width: size,
          }}
        >
          <Image imagePath={Funny} />
        </div>
      );
    case 'thrilled':
      return (
        <div
          style={{
            height: size,
            width: size,
          }}
        >
          <Image imagePath={Thrilled} />
        </div>
      );
    case 'bored':
      return (
        <div
          style={{
            height: size,
            width: size,
          }}
        >
          <Image imagePath={Bored} />
        </div>
      );
    case 'angry':
      return (
        <div
          style={{
            height: size,
            width: size,
          }}
        >
          <Image imagePath={Angry} />
        </div>
      );
    case 'sad':
      return (
        <div
          style={{
            height: size,
            width: size,
          }}
        >
          <Image imagePath={Sad} />
        </div>
      );
    case 'depressed':
      return (
        <div
          style={{
            height: size,
            width: size,
          }}
        >
          <Image imagePath={Depressed} />
        </div>
      );
    default:
      return (
        <div
          style={{
            height: size,
            width: size,
          }}
        >
          <Image imagePath={Euphoric} />
        </div>
      );
  }
}
