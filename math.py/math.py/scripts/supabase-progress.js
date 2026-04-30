// =============================================
// Supabase Progress Helper Functions
// =============================================
// Use these functions to save/load user progress to Supabase

/**
 * Save user progress for a specific topic to Supabase
 * @param {string} topic - The topic name (e.g., 'Algebra', 'Geometry')
 * @param {object} progressData - Progress data object
 * @returns {Promise<object>} - Result of the operation
 */
async function saveProgressToSupabase(topic, progressData) {
    try {
        const { data: { user } } = await supabaseClient.auth.getUser();
        if (!user) {
            console.error('No user logged in');
            return { error: 'Not authenticated' };
        }

        const { data, error } = await supabaseClient
            .from('user_progress')
            .upsert({
                user_id: user.id,
                topic: topic,
                diagnosed_level: progressData.diagnosed_level || null,
                current_level: progressData.current_level || null,
                target_level: progressData.target_level || null,
                easy_score: progressData.easy_score || 0,
                medium_score: progressData.medium_score || 0,
                hard_score: progressData.hard_score || 0,
                total_questions: progressData.total_questions || 0,
                correct_answers: progressData.correct_answers || 0,
                last_practice_date: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }, {
                onConflict: 'user_id,topic'
            });

        if (error) {
            console.error('Error saving progress:', error);
            return { error };
        }

        console.log('Progress saved to Supabase:', data);
        return { data };
    } catch (err) {
        console.error('Exception saving progress:', err);
        return { error: err };
    }
}

/**
 * Load user progress for a specific topic from Supabase
 * @param {string} topic - The topic name
 * @returns {Promise<object>} - Progress data or null
 */
async function loadProgressFromSupabase(topic) {
    try {
        const { data: { user } } = await supabaseClient.auth.getUser();
        if (!user) {
            console.error('No user logged in');
            return null;
        }

        const { data, error } = await supabaseClient
            .from('user_progress')
            .select('*')
            .eq('user_id', user.id)
            .ilike('topic', topic)
            .limit(1);

        if (error) {
            console.error('Error loading progress:', error);
            return null;
        }

        if (!data || data.length === 0) {
            console.log('No progress found for topic:', topic);
            return null;
        }

        console.log('Progress loaded from Supabase:', data[0]);
        return data[0];
    } catch (err) {
        console.error('Exception loading progress:', err);
        return null;
    }
}

/**
 * Load all progress for the current user
 * @returns {Promise<Array>} - Array of progress objects
 */
async function loadAllProgressFromSupabase() {
    try {
        const { data: { user }, error: authError } = await supabaseClient.auth.getUser();

        if (authError) {
            console.error('Auth error:', authError);
            // Session expired or invalid - redirect to login
            window.location.href = 'landing.html';
            return [];
        }

        if (!user) {
            console.error('No user logged in');
            // No user session - redirect to login
            window.location.href = 'landing.html';
            return [];
        }

        console.log('Fetching progress for user:', user.email, user.id);

        const { data, error } = await supabaseClient
            .from('user_progress')
            .select('*')
            .eq('user_id', user.id);

        if (error) {
            console.error('Error loading all progress:', error);
            // If 406 or auth-related error, redirect to login
            if (error.code === '406' || error.message.includes('JWT')) {
                console.error('Session expired - redirecting to login');
                window.location.href = 'landing.html';
            }
            return [];
        }

        console.log('All progress loaded from Supabase:', data);
        return data || [];
    } catch (err) {
        console.error('Exception loading all progress:', err);
        return [];
    }
}

/**
 * Delete progress for a specific topic
 * @param {string} topic - The topic name
 * @returns {Promise<object>} - Result of the operation
 */
async function deleteProgressFromSupabase(topic) {
    try {
        const { data: { user } } = await supabaseClient.auth.getUser();
        if (!user) {
            console.error('No user logged in');
            return { error: 'Not authenticated' };
        }

        const { data, error } = await supabaseClient
            .from('user_progress')
            .delete()
            .eq('user_id', user.id)
            .eq('topic', topic);

        if (error) {
            console.error('Error deleting progress:', error);
            return { error };
        }

        console.log('Progress deleted from Supabase:', data);
        return { data };
    } catch (err) {
        console.error('Exception deleting progress:', err);
        return { error: err };
    }
}

/**
 * Delete ALL progress for the current user
 * @returns {Promise<object>} - Result of the operation
 */
async function deleteAllProgressFromSupabase() {
    try {
        const { data: { user } } = await supabaseClient.auth.getUser();
        if (!user) {
            console.error('No user logged in');
            return { error: 'Not authenticated' };
        }

        const { data, error } = await supabaseClient
            .from('user_progress')
            .delete()
            .eq('user_id', user.id);

        if (error) {
            console.error('Error deleting all progress:', error);
            return { error };
        }

        console.log('All progress deleted from Supabase:', data);
        return { data };
    } catch (err) {
        console.error('Exception deleting all progress:', err);
        return { error: err };
    }
}

// Expose functions to global scope
window.saveProgressToSupabase = saveProgressToSupabase;
window.loadProgressFromSupabase = loadProgressFromSupabase;
window.loadAllProgressFromSupabase = loadAllProgressFromSupabase;
window.deleteProgressFromSupabase = deleteProgressFromSupabase;
window.deleteAllProgressFromSupabase = deleteAllProgressFromSupabase;
