import { db } from './src/db';

async function fixUserIds() {
  try {
    console.log('Checking activities and user associations...');
    
    // Get all users
    const users = await db('users').select('id', 'name', 'email').orderBy('id');
    console.log('\nAll users:');
    users.forEach(user => {
      console.log(`  User ${user.id}: ${user.name} (${user.email})`);
    });
    
    // Get all activities
    const activities = await db('activities').select('*');
    console.log(`\nFound ${activities.length} activities`);
    
    if (users.length > 0 && activities.length > 0) {
      // Update activities to use the first 3 users (or however many exist)
      for (let i = 0; i < activities.length; i++) {
        const userIndex = i % Math.min(3, users.length);
        const userId = users[userIndex].id;
        await db('activities').where('id', activities[i].id).update({ userId });
        console.log(`  Updated activity ${activities[i].id} to userId=${userId} (${users[userIndex].name})`);
      }
    }
    
    console.log('\n✅ Verification:');
    const updated = await db('activities')
      .leftJoin('users', 'activities.userId', 'users.id')
      .select('activities.id', 'activities.userId', 'users.name as userName');
    
    updated.forEach(a => {
      console.log(`  Activity ${a.id}: userId=${a.userId}, userName=${a.userName}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fixUserIds();
