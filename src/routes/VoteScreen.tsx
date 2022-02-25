import React from 'react';
import { ref, set, increment as rtdbIncrement } from 'firebase/database';
import { useDatabase, useDatabaseObjectData } from 'reactfire';

import { useGame } from '../store/useGame';

const rep = [
  {
    repName: 'Rep 1',
    index: 1,
  },
  {
    repName: 'Rep 2',
    index: 2,
  },
  {
    repName: 'Rep 3',
    index: 3,
  },
];

export const VoteScreen = () => {
  const dbRef = useDatabase();

  const gameRef = ref(dbRef, '/');

  const { status, data } = useDatabaseObjectData<Record<string, any>>(gameRef);

  const increment = (amountToIncrement: number, index) => {
    return set(ref(dbRef, `/${data['currentLevel']}/${index}`), rtdbIncrement(amountToIncrement));
  };

  const { submitted, addSubmitted } = useGame();

  return status === 'success' ? (
    <>
      <div className="grid grid-cols-1 gap-5 w-full h-[100vh] bg-[#F4F4F4] p-5">
        {rep.map((r) => (
          <button
            className="flex items-center justify-center w-full h-full rounded-xl bg-[#FDD800] disabled:bg-[#FDF100]"
            disabled={submitted.includes(data['currentLevel'])}
            key={r.index}
            onClick={() => {
              alert(
                `You have already submitted for ${r.repName} in round ${data['currentLevel']} 😊`
              );
              increment(1, r.index);
              addSubmitted(data['currentLevel']);
            }}
          >
            <p>{r.repName}</p>
          </button>
        ))}
      </div>
    </>
  ) : null;
};
