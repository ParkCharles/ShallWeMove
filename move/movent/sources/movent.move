/// The Movent NFT project for recording various activities.
module movent::movent {
    use std::string::{Self, String};

    public struct MoventNFT has key, store {
        id: UID,
        title: String,
        description: String,
        image_url: String,
        location: String,
        participants: u64,
        achievement: u64,      // 하이킹: 최고 고도(m), 수영: 거리(m)
        duration: u64,         // 모든 활동의 소요 시간(분)
        date: u64,            // UNIX timestamp
        start_time: u64,      // UNIX timestamp
        end_time: u64,        // UNIX timestamp
        pool_length: u64,     // 수영: 풀 길이(m)
        num_laps: u64,        // 수영: 랩 수
        tags: String,         // 'hiking', 'swimming', 'moment'
        owner: address,
        created_at: u64
    }

    public entry fun mint_nft(
        title: vector<u8>,
        description: vector<u8>,
        image_url: vector<u8>,
        location: vector<u8>,
        participants: u64,
        achievement: u64,
        duration: u64,
        date: u64,
        start_time: u64,
        end_time: u64,
        pool_length: u64,
        num_laps: u64,
        tags: vector<u8>,
        ctx: &mut TxContext
    ) {
        let nft = MoventNFT {
            id: object::new(ctx),
            title: string::utf8(title),
            description: string::utf8(description),
            image_url: string::utf8(image_url),
            location: string::utf8(location),
            participants,
            achievement,
            duration,
            date,
            start_time,
            end_time,
            pool_length,
            num_laps,
            tags: string::utf8(tags),
            owner: tx_context::sender(ctx),
            created_at: tx_context::epoch(ctx)
        };

        transfer::public_transfer(nft, tx_context::sender(ctx));
    }
}