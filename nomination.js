document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('nominationForm');
  const submitBtn = form.querySelector('button[type="submit"]');
  const game = 'crushboys';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim().toLowerCase();
    const year = document.getElementById('year').value;
    const branch = document.getElementById('branch').value;

    if (!username || !year || !branch) {
      alert('⚠️ Please fill in all fields!');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    const docId = `${game}_${username}`;

    try {
      const docRef = db.collection('nominations').doc(docId);
      const doc = await docRef.get();

      if (doc.exists) {
        alert('❌ Already nominated!');
      } else {
        await docRef.set({
          username,
          year,
          branch,
          votes: 0,
          game,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert('✅ Nomination submitted!');
        form.reset();
      }
    } catch (err) {
      console.error(err);
      alert('❌ Something went wrong. Check Firebase rules & config.');
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Nomination";
  });
});
