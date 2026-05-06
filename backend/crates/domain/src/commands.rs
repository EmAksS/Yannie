pub enum RegisterCommand {
    Email {
        email: String,
        raw_password: String,
        public_name: String,
    },
    Wallet {
        address: String,
        public_name: String,
    },
}