import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const LS_KEY = 'portfolio_likes_v1';

function getLocalLikes(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(LS_KEY) ?? '[]'));
  } catch {
    return new Set();
  }
}

export function useLikes() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [liked, setLiked] = useState<Set<string>>(getLocalLikes);

  useEffect(() => {
    supabase
      .from('project_likes')
      .select('project_id, count')
      .then(({ data }) => {
        if (!data) return;
        setCounts(Object.fromEntries(data.map(r => [r.project_id, r.count])));
      });

    const channel = supabase
      .channel('likes_rt')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'project_likes' },
        ({ new: row }) => {
          const r = row as { project_id: string; count: number };
          if (r?.project_id !== undefined) {
            setCounts(prev => ({ ...prev, [r.project_id]: r.count }));
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const toggle = useCallback(async (id: string) => {
    const isLiked = liked.has(id);

    const next = new Set(liked);
    if (isLiked) next.delete(id); else next.add(id);
    setLiked(next);
    localStorage.setItem(LS_KEY, JSON.stringify([...next]));

    setCounts(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] ?? 0) + (isLiked ? -1 : 1)),
    }));

    await supabase.rpc(isLiked ? 'decrement_like' : 'increment_like', { p_id: id });
  }, [liked]);

  return { counts, liked, toggle };
}

export type LikesApi = ReturnType<typeof useLikes>;
