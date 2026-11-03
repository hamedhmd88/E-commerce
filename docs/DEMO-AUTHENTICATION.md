# Demo authentication

Account actions demonstrate form and session behavior. They do not establish a production identity or authorization boundary. Never reuse a real password in this demo. Sign-out clears the local demo session; browser storage can be cleared to reset demo state.

The registration form accepts Persian and English letters in names and usernames. Passwords need at least eight characters, one letter and one number; Persian and Arabic digits count as numbers. Phone numbers also accept Persian and Arabic digits. Validation messages and form direction follow the selected language. Password fields stay browser-local during submission and are not saved in the demo session.

Saved demo sessions are validated before use; incomplete or malformed browser records are discarded. Profile editing keeps street and city as separate fields so addresses containing commas are preserved.
