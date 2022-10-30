import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGroupById } from 'src/Pages/GroupPage/queries';

export function useGroupGuard() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const controller = new AbortController();

  useEffect(() => {
    console.log('Fetching Group');
    setLoading(true);
    fetchGroupById(id!)
      .catch((err: any) => {
        console.log(err);
        setError(err);
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, [id]);

  return { loading, error };
}
