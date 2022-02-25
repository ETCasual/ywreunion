import { ref, set, increment as rtdbIncrement } from 'firebase/database';
import { useDatabase, useDatabaseObjectData } from 'reactfire';

export const AdminScreen = () => {
  const dbRef = useDatabase();

  const gameRef = ref(dbRef, '/currentLevel');
  const { status, data } = useDatabaseObjectData<Record<string, any>>(gameRef);

  const increment = (amountToIncrement: number) => {
    return set(gameRef, rtdbIncrement(amountToIncrement));
  };

  return status === 'success' ? (
    <>
      <div className="grid grid-cols-2 gap-5 w-full h-[100vh] bg-[#F4F4F4] p-5">
        <div className="col-span-2 bg-[#FDD500] rounded-xl justify-center flex items-center">
          <p className="font-bold text-xl">Current Level: {data}</p>
        </div>
        <button
          className="bg-[#FCA100] rounded-xl justify-center flex items-center"
          onClick={() => {
            increment(-1);
          }}
        >
          <p className="text-xl">Previous Level</p>
        </button>
        <button
          className="bg-[#FCA100] rounded-xl justify-center flex items-center"
          onClick={() => {
            increment(1);
          }}
        >
          <p className="text-xl">Next Level</p>
        </button>
      </div>
    </>
  ) : null;
};
