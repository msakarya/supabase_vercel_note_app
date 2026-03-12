import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {

  if (req.method === "GET") {

    const { data } = await supabase
      .from("notes")
      .select("*")
      .order("id",{ascending:false});

    return res.json(data);
  }

  if (req.method === "POST") {

    const { text } = req.body;

    await supabase
      .from("notes")
      .insert([{ text }]);

    return res.json({status:"ok"});
  }

  if (req.method === "DELETE") {

    const id = req.query.id;

    await supabase
      .from("notes")
      .delete()
      .eq("id",id);

    return res.json({status:"deleted"});
  }

}
