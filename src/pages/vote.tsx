import { FirebaseProps } from '../config/firebaseProps';
import { VoteScreen } from '../routes/VoteScreen';

const VotePage = () => (
  <FirebaseProps>
    <VoteScreen />
  </FirebaseProps>
);

export default VotePage;
