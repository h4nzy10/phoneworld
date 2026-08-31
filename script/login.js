import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabase = createClient(
  'https://nkiwbbpayyvciasfsfmx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5raXdiYnBheXl2Y2lhc2ZzZm14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4NTM4OTcsImV4cCI6MjA5NTQyOTg5N30.9l-eUGzbyHcu4XHtGCckNO47UjH-HKi_Uh2w9qLX3fU'
)

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        alert("Login berhasil! Selamat datang " + data.user.email);
        window.location.href = "home.html"
    } catch (err) {
        alert("Username atau password tidak valid, silahkan cek kembali");
    }
}

document.getElementById("btn-login").addEventListener("click", login)