import { Artist, Album, Song } from "@/types/music";

// Simplified Taylor Swift data for the AI chatbot app
export const taylorSwiftData: Artist = {
  id: "taylor-swift",
  name: "Taylor Swift",
  imageUrl: "/taylor-swift.jpg",
  albums: [
    {
      id: "taylor-swift",
      name: "Taylor Swift",
      releaseYear: 2006,
      color: "#FF6B6B",
      songs: [
        { id: "1", title: "Tim McGraw", trackNumber: 1, duration: "3:54" },
        { id: "2", title: "Picture to Burn", trackNumber: 2, duration: "2:55" },
        { id: "3", title: "Teardrops on My Guitar", trackNumber: 3, duration: "3:24" },
        { id: "4", title: "A Place in This World", trackNumber: 4, duration: "3:22" },
        { id: "5", title: "Cold as You", trackNumber: 5, duration: "4:01" },
        { id: "6", title: "The Outside", trackNumber: 6, duration: "3:29" },
        { id: "7", title: "Tied Together with a Smile", trackNumber: 7, duration: "4:11" },
        { id: "8", title: "Stay Beautiful", trackNumber: 8, duration: "3:58" },
        { id: "9", title: "Should've Said No", trackNumber: 9, duration: "4:04" },
        { id: "10", title: "Mary's Song (Oh My My My)", trackNumber: 10, duration: "3:35" },
        { id: "11", title: "Our Song", trackNumber: 11, duration: "3:24" },
        { id: "12", title: "I'm Only Me When I'm with You", trackNumber: 12, duration: "3:33" },
      ]
    },
    {
      id: "fearless",
      name: "Fearless",
      releaseYear: 2008,
      color: "#FFD93D",
      songs: [
        { id: "15", title: "Fearless", trackNumber: 1, duration: "4:01" },
        { id: "16", title: "Fifteen", trackNumber: 2, duration: "4:54" },
        { id: "17", title: "Love Story", trackNumber: 3, duration: "3:55" },
        { id: "18", title: "Hey Stephen", trackNumber: 4, duration: "4:14" },
        { id: "19", title: "White Horse", trackNumber: 5, duration: "3:54" },
        { id: "20", title: "You Belong with Me", trackNumber: 6, duration: "3:51" },
        { id: "21", title: "Breathe", trackNumber: 7, duration: "4:23" },
        { id: "22", title: "Tell Me Why", trackNumber: 8, duration: "3:20" },
        { id: "23", title: "You're Not Sorry", trackNumber: 9, duration: "4:21" },
        { id: "24", title: "The Way I Loved You", trackNumber: 10, duration: "4:04" },
        { id: "25", title: "Forever & Always", trackNumber: 11, duration: "3:45" },
        { id: "26", title: "The Best Day", trackNumber: 12, duration: "4:05" },
        { id: "27", title: "Change", trackNumber: 13, duration: "4:40" },
      ]
    },
    {
      id: "speak-now",
      name: "Speak Now",
      releaseYear: 2010,
      color: "#6BCF7F",
      songs: [
        { id: "28", title: "Mine", trackNumber: 1, duration: "3:51" },
        { id: "29", title: "Sparks Fly", trackNumber: 2, duration: "4:20" },
        { id: "30", title: "Back to December", trackNumber: 3, duration: "4:53" },
        { id: "31", title: "Speak Now", trackNumber: 4, duration: "4:00" },
        { id: "32", title: "Dear John", trackNumber: 5, duration: "6:43" },
        { id: "33", title: "Mean", trackNumber: 6, duration: "3:58" },
        { id: "34", title: "The Story of Us", trackNumber: 7, duration: "4:26" },
        { id: "35", title: "Never Grow Up", trackNumber: 8, duration: "4:50" },
        { id: "36", title: "Enchanted", trackNumber: 9, duration: "5:52" },
        { id: "37", title: "Better Than Revenge", trackNumber: 10, duration: "3:37" },
        { id: "38", title: "Innocent", trackNumber: 11, duration: "5:27" },
        { id: "39", title: "Haunted", trackNumber: 12, duration: "4:02" },
        { id: "40", title: "Last Kiss", trackNumber: 13, duration: "6:07" },
        { id: "41", title: "Long Live", trackNumber: 14, duration: "5:17" },
      ]
    },
    {
      id: "red",
      name: "Red",
      releaseYear: 2012,
      color: "#FF6B6B",
      songs: [
        { id: "42", title: "State of Grace", trackNumber: 1, duration: "4:55" },
        { id: "43", title: "Red", trackNumber: 2, duration: "3:43" },
        { id: "44", title: "Treacherous", trackNumber: 3, duration: "4:02" },
        { id: "45", title: "I Knew You Were Trouble", trackNumber: 4, duration: "3:39" },
        { id: "46", title: "All Too Well", trackNumber: 5, duration: "5:29" },
        { id: "47", title: "22", trackNumber: 6, duration: "3:52" },
        { id: "48", title: "I Almost Do", trackNumber: 7, duration: "4:04" },
        { id: "49", title: "We Are Never Ever Getting Back Together", trackNumber: 8, duration: "3:13" },
        { id: "50", title: "Stay Stay Stay", trackNumber: 9, duration: "3:25" },
        { id: "51", title: "The Last Time", trackNumber: 10, duration: "4:59" },
        { id: "52", title: "Holy Ground", trackNumber: 11, duration: "3:22" },
        { id: "53", title: "Sad Beautiful Tragic", trackNumber: 12, duration: "4:44" },
        { id: "54", title: "The Lucky One", trackNumber: 13, duration: "4:00" },
        { id: "55", title: "Everything Has Changed", trackNumber: 14, duration: "4:05" },
        { id: "56", title: "Starlight", trackNumber: 15, duration: "3:40" },
        { id: "57", title: "Begin Again", trackNumber: 16, duration: "3:58" },
      ]
    },
    {
      id: "1989",
      name: "1989",
      releaseYear: 2014,
      color: "#4ECDC4",
      songs: [
        { id: "58", title: "Welcome to New York", trackNumber: 1, duration: "3:33" },
        { id: "59", title: "Blank Space", trackNumber: 2, duration: "3:52" },
        { id: "60", title: "Style", trackNumber: 3, duration: "3:51" },
        { id: "61", title: "Out of the Woods", trackNumber: 4, duration: "3:55" },
        { id: "62", title: "All You Had to Do Was Stay", trackNumber: 5, duration: "3:13" },
        { id: "63", title: "Shake It Off", trackNumber: 6, duration: "3:39" },
        { id: "64", title: "I Wish You Would", trackNumber: 7, duration: "3:27" },
        { id: "65", title: "Bad Blood", trackNumber: 8, duration: "3:31" },
        { id: "66", title: "Wildest Dreams", trackNumber: 9, duration: "3:40" },
        { id: "67", title: "How You Get the Girl", trackNumber: 10, duration: "4:07" },
        { id: "68", title: "This Love", trackNumber: 11, duration: "4:10" },
        { id: "69", title: "I Know Places", trackNumber: 12, duration: "3:15" },
        { id: "70", title: "Clean", trackNumber: 13, duration: "4:31" },
      ]
    },
    {
      id: "reputation",
      name: "reputation",
      releaseYear: 2017,
      color: "#2C3E50",
      songs: [
        { id: "71", title: "...Ready for It?", trackNumber: 1, duration: "3:28" },
        { id: "72", title: "End Game", trackNumber: 2, duration: "4:04" },
        { id: "73", title: "I Did Something Bad", trackNumber: 3, duration: "3:58" },
        { id: "74", title: "Don't Blame Me", trackNumber: 4, duration: "3:56" },
        { id: "75", title: "Delicate", trackNumber: 5, duration: "3:52" },
        { id: "76", title: "Look What You Made Me Do", trackNumber: 6, duration: "3:31" },
        { id: "77", title: "So It Goes...", trackNumber: 7, duration: "3:47" },
        { id: "78", title: "Gorgeous", trackNumber: 8, duration: "3:29" },
        { id: "79", title: "Getaway Car", trackNumber: 9, duration: "3:53" },
        { id: "80", title: "King of My Heart", trackNumber: 10, duration: "3:34" },
        { id: "81", title: "Dancing With Our Hands Tied", trackNumber: 11, duration: "3:31" },
        { id: "82", title: "Dress", trackNumber: 12, duration: "3:50" },
        { id: "83", title: "This Is Why We Can't Have Nice Things", trackNumber: 13, duration: "3:27" },
        { id: "84", title: "Call It What You Want", trackNumber: 14, duration: "3:23" },
        { id: "85", title: "New Year's Day", trackNumber: 15, duration: "3:55" },
      ]
    },
    {
      id: "lover",
      name: "Lover",
      releaseYear: 2019,
      color: "#FF69B4",
      songs: [
        { id: "86", title: "I Forgot That You Existed", trackNumber: 1, duration: "2:51" },
        { id: "87", title: "Cruel Summer", trackNumber: 2, duration: "2:58" },
        { id: "88", title: "Lover", trackNumber: 3, duration: "3:41" },
        { id: "89", title: "The Man", trackNumber: 4, duration: "3:10" },
        { id: "90", title: "The Archer", trackNumber: 5, duration: "3:31" },
        { id: "91", title: "I Think He Knows", trackNumber: 6, duration: "2:53" },
        { id: "92", title: "Miss Americana & The Heartbreak Prince", trackNumber: 7, duration: "3:54" },
        { id: "93", title: "Paper Rings", trackNumber: 8, duration: "3:42" },
        { id: "94", title: "Cornelia Street", trackNumber: 9, duration: "4:47" },
        { id: "95", title: "Death By A Thousand Cuts", trackNumber: 10, duration: "3:18" },
        { id: "96", title: "London Boy", trackNumber: 11, duration: "3:10" },
        { id: "97", title: "Soon You'll Get Better", trackNumber: 12, duration: "3:21" },
        { id: "98", title: "False God", trackNumber: 13, duration: "3:20" },
        { id: "99", title: "You Need To Calm Down", trackNumber: 14, duration: "2:51" },
        { id: "100", title: "Afterglow", trackNumber: 15, duration: "3:43" },
        { id: "101", title: "ME!", trackNumber: 16, duration: "3:13" },
        { id: "102", title: "It's Nice To Have A Friend", trackNumber: 17, duration: "2:30" },
        { id: "103", title: "Daylight", trackNumber: 18, duration: "4:53" },
      ]
    },
    {
      id: "folklore",
      name: "folklore",
      releaseYear: 2020,
      color: "#8B4513",
      songs: [
        { id: "104", title: "the 1", trackNumber: 1, duration: "3:30" },
        { id: "105", title: "cardigan", trackNumber: 2, duration: "3:59" },
        { id: "106", title: "the last great american dynasty", trackNumber: 3, duration: "3:50" },
        { id: "107", title: "exile", trackNumber: 4, duration: "4:45" },
        { id: "108", title: "my tears ricochet", trackNumber: 5, duration: "4:15" },
        { id: "109", title: "mirrorball", trackNumber: 6, duration: "3:28" },
        { id: "110", title: "seven", trackNumber: 7, duration: "3:28" },
        { id: "111", title: "august", trackNumber: 8, duration: "4:21" },
        { id: "112", title: "this is me trying", trackNumber: 9, duration: "3:15" },
        { id: "113", title: "illicit affairs", trackNumber: 10, duration: "3:10" },
        { id: "114", title: "invisible string", trackNumber: 11, duration: "4:12" },
        { id: "115", title: "mad woman", trackNumber: 12, duration: "3:57" },
        { id: "116", title: "epiphany", trackNumber: 13, duration: "4:49" },
        { id: "117", title: "betty", trackNumber: 14, duration: "4:54" },
        { id: "118", title: "peace", trackNumber: 15, duration: "3:54" },
        { id: "119", title: "hoax", trackNumber: 16, duration: "3:40" },
      ]
    },
    {
      id: "evermore",
      name: "evermore",
      releaseYear: 2020,
      color: "#8B7355",
      songs: [
        { id: "120", title: "willow", trackNumber: 1, duration: "3:34" },
        { id: "121", title: "champagne problems", trackNumber: 2, duration: "4:04" },
        { id: "122", title: "gold rush", trackNumber: 3, duration: "3:05" },
        { id: "123", title: "'tis the damn season", trackNumber: 4, duration: "3:49" },
        { id: "124", title: "tolerate it", trackNumber: 5, duration: "4:05" },
        { id: "125", title: "no body, no crime", trackNumber: 6, duration: "3:35" },
        { id: "126", title: "happiness", trackNumber: 7, duration: "5:15" },
        { id: "127", title: "dorothea", trackNumber: 8, duration: "3:45" },
        { id: "128", title: "coney island", trackNumber: 9, duration: "4:35" },
        { id: "129", title: "ivy", trackNumber: 10, duration: "4:20" },
        { id: "130", title: "cowboy like me", trackNumber: 11, duration: "4:35" },
        { id: "131", title: "long story short", trackNumber: 12, duration: "3:35" },
        { id: "132", title: "marjorie", trackNumber: 13, duration: "4:17" },
        { id: "133", title: "closure", trackNumber: 14, duration: "3:00" },
        { id: "134", title: "evermore", trackNumber: 15, duration: "5:04" },
      ]
    },
    {
      id: "midnights",
      name: "Midnights",
      releaseYear: 2022,
      color: "#4A4A4A",
      songs: [
        { id: "135", title: "Lavender Haze", trackNumber: 1, duration: "3:22" },
        { id: "136", title: "Maroon", trackNumber: 2, duration: "3:38" },
        { id: "137", title: "Anti-Hero", trackNumber: 3, duration: "3:20" },
        { id: "138", title: "Snow On The Beach", trackNumber: 4, duration: "4:16" },
        { id: "139", title: "You're On Your Own, Kid", trackNumber: 5, duration: "3:14" },
        { id: "140", title: "Midnight Rain", trackNumber: 6, duration: "2:54" },
        { id: "141", title: "Question...?", trackNumber: 7, duration: "3:30" },
        { id: "142", title: "Vigilante Shit", trackNumber: 8, duration: "2:44" },
        { id: "143", title: "Bejeweled", trackNumber: 9, duration: "3:14" },
        { id: "144", title: "Labyrinth", trackNumber: 10, duration: "4:07" },
        { id: "145", title: "Karma", trackNumber: 11, duration: "3:24" },
        { id: "146", title: "Sweet Nothing", trackNumber: 12, duration: "3:08" },
        { id: "147", title: "Mastermind", trackNumber: 13, duration: "3:11" },
      ]
    },
    {
      id: "the-tortured-poets-department",
      name: "The Tortured Poets Department",
      releaseYear: 2024,
      color: "#9B59B6",
      songs: [
        { id: "148", title: "Fortnight", trackNumber: 1, duration: "3:38" },
        { id: "149", title: "The Tortured Poets Department", trackNumber: 2, duration: "4:11" },
        { id: "150", title: "My Boy Only Breaks His Favorite Toys", trackNumber: 3, duration: "3:15" },
        { id: "151", title: "Down Bad", trackNumber: 4, duration: "4:11" },
        { id: "152", title: "So Long, London", trackNumber: 5, duration: "4:21" },
        { id: "153", title: "But Daddy I Love Him", trackNumber: 6, duration: "3:49" },
        { id: "154", title: "Fresh Out The Slammer", trackNumber: 7, duration: "3:21" },
        { id: "155", title: "Florida!!!", trackNumber: 8, duration: "3:21" },
        { id: "156", title: "Guilty as Sin?", trackNumber: 9, duration: "3:49" },
        { id: "157", title: "Who's Afraid of Little Old Me?", trackNumber: 10, duration: "4:17" },
        { id: "158", title: "I Can Fix Him (No Really I Can)", trackNumber: 11, duration: "2:36" },
        { id: "159", title: "loml", trackNumber: 12, duration: "4:26" },
        { id: "160", title: "I Can Do It With a Broken Heart", trackNumber: 13, duration: "3:12" },
        { id: "161", title: "The Smallest Man Who Ever Lived", trackNumber: 14, duration: "4:23" },
        { id: "162", title: "The Alchemy", trackNumber: 15, duration: "3:18" },
        { id: "163", title: "Clara Bow", trackNumber: 16, duration: "3:25" },
      ]
    }
  ]
};

export function getTaylorSwiftArtist(): Artist {
  return taylorSwiftData;
}

export function getAllAlbums(): Album[] {
  return taylorSwiftData.albums;
}

export function getSongsByAlbum(albumId: string): Song[] {
  const album = taylorSwiftData.albums.find(a => a.id === albumId);
  return album ? album.songs : [];
}
