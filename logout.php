<?php
session_start();
session_destroy(); // ✅ Destroy PHP session

// ✅ Clear LocalStorage using JavaScript
echo "<script>
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
</script>";
?>
