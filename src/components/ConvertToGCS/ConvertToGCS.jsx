import React, { useState } from 'react';
import axios from 'axios';

const ConvertToGCS = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleJsonInputChange = (event) => {
        setJsonInput(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const parsedJSONdata = JSON.parse(jsonInput);
            await uploadToGCS(parsedJSONdata);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Invalid JSON format');
        }
    };

    const uploadToGCS = async (data) => {
        try {
            await axios.post('/api/gcs/uploadJson', { jsonData: data });
            console.log('JSON data uploaded to GCS successfully');
        } catch (error) {
            console.error('Error uploading JSON data to GCS:', error);
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <p>Input your JSON file here</p>
                    <textarea
                        id="jsonInput"
                        name="jsonInput"
                        value={jsonInput}
                        onChange={handleJsonInputChange}
                        rows={25}
                        cols={80}
                        placeholder="Enter JSON"
                    />
                </div>
                <br/>
                <center>
                    <input className="btn" type="submit" />
                    <br/>See PDF Below<br/>
                    {loading && <p>Loading PDF...</p>}
                </center>
            </form>
        </div>
    );
};

export default ConvertToGCS;







// {
//     "questions": [
//         {
//             "title": "My Greendale Roots",
//             "elements": [
//                 {
//                     "type": "text"
//                 },
//                 {
//                     "type": "text",
//                     "value": "For me, Greendale stood as a tranquil oasis amidst the rolling landscapes—a town etched into the canvas of my upbringing, its essence woven into the fabric of my earliest memories.\n\nI emerged into the world on a serene morning, where the sun painted the sky in hues of rose and gold, casting a gentle glow upon the quaint town nestled within the embrace of verdant hills. My first cries echoed through the corridors of the small-town hospital, a herald of beginnings—a humble note in the symphony of life unfolding in Greendale."
//                 },
//                 {
//                     "type": "image",
//                     "value": "https://app.kindredtales.net/version-test/fileupload/f1702329614434x611155777314369400/town.png"
//                 },
//                 {
//                     "type": "text",
//                     "value": "From those first breaths, Greendale became my sanctuary—a place where the rhythms of life moved at a leisurely pace, and neighborly bonds were as sturdy as the ancient oaks that graced the town square. Childhood in Greendale was an idyllic tapestry—a mosaic of simplicity and communal kinship that shaped the contours of my upbringing.\n\nThe town was a portrait of Americana—elm-lined streets cradled homes with wraparound porches and white picket fences, where the aroma of freshly baked pies wafted through open windows and the distant laughter of children playing echoed in harmony with the chirping of robins.\n\nThe heart of Greendale beat at Main Street—a vibrant tapestry of mom-and-pop stores, each storefront a testament to the entrepreneurial spirit that thrived in the town. From Mr. Johnson’s corner store, where candies sparked childhood dreams, to the local diner, Maple Leaf Café, where Sunday brunches were a ritual of comfort and camaraderie, Main Street was the hub of community spirit.\n\nThe schoolhouse, Greendale Elementary, stood as a beacon of learning—a red-brick edifice that echoed with the laughter of generations. Here, we forged friendships that felt as enduring as the town's ancient oak trees, and teachers became stewards of knowledge, nurturing the seeds of curiosity that would shape our futures.\n\nLife in Greendale unfolded in sync with the seasons—summer days were painted with the vibrancy of county fairs, where the scent of kettle corn mingled with the exhilarating sounds of carnival rides. Fall was a symphony of colors—a canvas adorned with the fiery hues of maple leaves, inviting families to meander through pumpkin patches and harvest festivals.\n\nWinters, though blanketed in snow, brought the warmth of community gatherings—a season of togetherness where hearths crackled with warmth, and the town square transformed into a wonderland of twinkling lights and laughter.\n\nBut it was spring in Greendale that held a special place in our hearts—the season of renewal and rebirth. The town burst into life, blossoms painted the landscape with pastel hues, and the air was filled with the chorus of songbirds—a time when hope bloomed in the hearts of townsfolk, mirroring the vibrant tapestry of nature's awakening.\n\nGrowing up in Greendale was more than just an upbringing; it was a symphony of experiences—a chapter of life enriched by the simplicity of community bonds, the embrace of small-town values, and the timeless charm of an era steeped in nostalgia.\n\nAs I traverse the tapestry of time, the memories of Greendale remain etched into the recesses of my being—a testament to the cherished moments and the enduring spirit of a town that will forever be my compass point to the essence of home."
//                 }
//             ]
//         },
//         {
//             "title": "My first ever memory",
//             "elements": [
//                 {
//                     "type": "text",
//                     "value": "As far back as memory stretches, there’s a cherished recollection that remains vivid—a tender embrace within the cocoon of my mother’s arms. This poignant memory, though from a time when words were yet to form coherent thoughts, resides as a gentle whisper from the earliest chapters of my life.\n\nPicture a room awash with the soft glow of morning light filtering through delicate curtains, casting ethereal patterns upon the walls. In the heart of this serene tableau, I, a tiny soul yet to fully fathom the vastness of existence, was cradled in the sanctuary of my mother’s embrace.\n\nI couldn’t have been more than a year old, my world still a canvas of unfolding mysteries. Yet, within the confines of that moment, there was a profound sense of security—a sentiment that transcended the limitations of language and comprehension. The familiarity of her heartbeat, the gentle cadence of her breathing, orchestrated a symphony of comfort that cocooned me in an oasis of tranquility.\n\nHer arms, a haven of warmth and tenderness, encapsulated not just a physical shelter but an emotional refuge—a sanctuary where the uncertainties of the world dissipated into insignificance. The unspoken language of a mother’s love enveloped me, creating an impression that reverberates through the corridors of time.\n\nIn that intimate space, the bond between mother and child transcended the mundane, evolving into an embodiment of unspoken promises—promises of protection, nurturance, and an unwavering companionship through the labyrinth of life.\n\nThe room, a sanctuary of serenity, bore witness to the gentle sway of her embrace. It was a rhythmic dance, a choreography of unconditional love. Her murmured lullabies, like whispers from angels, resonated within the confines of that space—a melody that reverberated beyond the tangible, transcending the realms of mere sound.\n\nWithin her arms, I found solace, a haven from the cacophony of the outside world. Her scent—subtle, yet intimately familiar—mingled with the essence of safety, becoming an olfactory beacon guiding me through the uncharted landscapes of infancy.\n\nThough the passage of time has painted the details in hazy strokes, that moment remains a testament to the genesis of affection, trust, and an enduring bond. It was an introduction to the artistry of love—a canvas painted not with vibrant hues but with the subtle shades of tenderness, a masterpiece that transcended the constraints of time.\n\nIn the tapestry of life, that memory stands as the cornerstone—a gentle reminder that amidst the symphony of experiences that unfold, the embrace of a mother’s love remains an indelible thread weaving its way through the fabric of existence.\n\nAs I journey through the corridors of time, that memory lingers—a treasure trove of comfort and assurance, an everlasting testament to the beauty of maternal love, and a touchstone to the innocence and purity of the earliest moments in life."
//                 },
//                 {
//                     "type": "image",
//                     "value": "https://app.kindredtales.net/version-test/fileupload/f1705614160981x813944839252340100/pexels-karolina-grabowska-5427180.jpg"
//                 }
//             ]
//         },
//         {
//             "title": "Who were your parents?",
//             "elements": [
//                 {
//                     "type": "text"
//                 },
//                 {
//                     "type": "text",
//                     "value": "My mother, Evelyn, was a vision of elegance and grace, her origins traced back to the sun-kissed shores of southern Italy. Her spirit was as fiery as the Mediterranean sun, her laughter a symphony that echoed through the rolling hills of her homeland. With cascading locks of chestnut hair and eyes that held the warmth of a summer sunrise, she carried herself with a regal air, a testament to her proud heritage.\n\nBorn into a family steeped in traditions older than time itself, Evelyn was a fusion of modernity and ancient wisdom. Her upbringing was adorned with tales of folklore, whispered by elders under the starry Italian sky. The rustic charm of her village nestled amidst olive groves and vineyards painted a picturesque backdrop for her formative years.\n\nYet, it was her unyielding determination that set her apart. Her dreams soared beyond the confines of her village, reaching for horizons that beckoned with promises of opportunity and adventure. Armed with ambition and a heart brimming with courage, she embarked on a journey that led her far from the shores of her homeland."
//                 },
//                 {
//                     "type": "image",
//                     "value": "https://app.kindredtales.net/version-test/fileupload/f1702334722464x730705076864878600/girl_1930s.png"
//                 },
//                 {
//                     "type": "text",
//                     "value": "On the other side of the world stood my father, Thomas, a man of quiet strength and unwavering resolve. His origins traced back to the rugged highlands of Scotland, a land shrouded in mist and legends. With tousled hair the color of burnished copper and eyes as blue as the lochs that dotted the landscape, he possessed a stoic demeanor that belied his warm heart."
//                 },
//                 {
//                     "type": "image",
//                     "value": "https://app.kindredtales.net/version-test/fileupload/f1702334729911x594093444710609000/boy%201930s.png"
//                 },
//                 {
//                     "type": "text",
//                     "value": "Raised in the embrace of emerald hills and ancient castles, Thomas was rooted in the traditions of his ancestors. His childhood echoed with tales of valor and bravery, of clans and tartans, a heritage that he wore with a quiet pride. The haunting beauty of Scotland was etched in his soul, shaping his character with its rugged landscapes and windswept moors.\n\nTheir paths converged in a twist of fate, a serendipitous meeting that defied geographical boundaries. Destiny wove their lives together in a bustling cityscape far from the lands they called home. It was a chance encounter that blossomed into a love story as vibrant as it was unexpected.\n\nTheir love knew no bounds, transcending cultural disparities and celebrating the beauty of diversity. They waltzed through life hand in hand, navigating the maze of challenges with a shared strength that fortified their bond.\n\nEvelyn brought with her the passion of Italy, infusing their home with the aromas of homemade pasta and the melodies of Italian ballads. Her laughter became the cornerstone of their household, a melody that accompanied the symphony of their lives.\n\nThomas, with his Scottish roots, instilled in us the values of resilience and fortitude. His tales of ancestral bravery and the Highland spirit resonated through our upbringing, shaping our character with their timeless wisdom."
//                 },
//                 {
//                     "type": "image",
//                     "value": "https://app.kindredtales.net/version-test/fileupload/f1702335087073x776507940266865900/wedding.png"
//                 },
//                 {
//                     "type": "text",
//                     "value": "Together, they crafted a home that was a melting pot of cultures, a sanctuary where diversity was celebrated and traditions merged harmoniously. Our family dinners were a testament to this fusion, blending flavors from two distinct culinary legacies into a feast that tantalized the senses.\n\nTheir union was not just a marriage of two souls; it was a testament to the beauty of embracing differences, of cherishing individual roots while intertwining them to create a richer, more vibrant tapestry of life.\n\nIn the grand narrative of my existence, my parents were the protagonists, their stories interwoven with mine, creating a mosaic of love, strength, and the enduring power of unity. Their legacy lives on in the lessons they imparted and the love that continues to guide my steps."
//                 }
//             ]
//         }
//     ]
// }
