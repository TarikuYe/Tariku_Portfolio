export const initialProjects = [
    {
        id: 1,
        slug: "weekly-report-automation",
        title: "Weekly Report Automation",
        subtitle: "Enterprise reporting dashboard with automated sentiment analysis & multi-source document ingestion.",
        category: "AI PIPELINE",
        liveBadge: "CASE STUDY",
        metaFooter: "2024 / FULL STACK / AI PIPELINE",
        ctaText: "CASE STUDY",
        deviceType: "laptop",
        timeline: "4 Months / 2024",
        role: "Lead Full-Stack & ML Engineer",
        client: "Enterprise Operations",
        status: "Production Deployed",
        price: 0,
        tech_stack: "PYTHON, NLP, FASTAPI, PYTORCH, CI/CD",
        techBadges: ["PYTHON", "NLP", "FASTAPI", "PYTORCH", "CI/CD"],
        description: "Enterprise reporting dashboard with automated sentiment analysis, automated data extraction, generating actionable insights from hundreds of spreadsheets and documents. Custom-trained summarization pipeline.",
        overview: "A mission-critical enterprise intelligence system engineered to eliminate manual report synthesis. The platform automatically ingests, normalizes, and extracts actionable insights from hundreds of distributed spreadsheets, client feedback logs, and operational reports each week. Leveraging custom fine-tuned transformer models, it produces executive summaries with quantified sentiment metrics and anomaly detection in seconds.",
        impactStats: [
            { value: "99.4%", label: "Extraction Accuracy" },
            { value: "12x", label: "Faster Report Turnaround" },
            { value: "450+", label: "Weekly Docs Processed" },
            { value: "< 1.5s", label: "Pipeline Latency" }
        ],
        challenges: [
            "Heterogeneous data formats across disparate departments (Excel, PDF, CSV, unstructured emails).",
            "Latency bottlenecks when running multi-stage NLP models over hundreds of weekly documents.",
            "Requirement for strict enterprise data privacy and deterministic summary audits."
        ],
        solutions: [
            "Built an asynchronous ingestion worker pool using FastAPI and Celery with Redis queue buffering.",
            "Distilled and quantized a domain-specific PyTorch NLP transformer to achieve sub-second document scoring.",
            "Created an interactive React dashboard with drill-down audit trails for every extracted metric."
        ],
        architecture: "Distributed microservices architecture utilizing FastAPI for inference endpoints, PostgreSQL with pgvector for semantic caching, and a containerized Docker pipeline orchestrated with automated CI/CD validation.",
        keyFeatures: [
            {
                title: "Automated Document Ingestion",
                description: "Seamless parsing and schema normalization across PDF, XLSX, and CSV with schema drift detection."
            },
            {
                title: "Custom NLP Summarization",
                description: "Fine-tuned transformer pipeline that condenses 40-page operational logs into executive action points."
            },
            {
                title: "Multi-Dimensional Sentiment Analysis",
                description: "Categorizes stakeholder feedback into sentiment scores, urgency levels, and departmental tags."
            },
            {
                title: "Executive Export Suite",
                description: "One-click generation of branded PDF and PowerPoint executive decks with live vector charts."
            }
        ],
        techDetails: {
            frontend: ["React.js", "Tailwind CSS", "Framer Motion", "Recharts"],
            backend: ["FastAPI", "Python 3.11", "Celery", "Redis"],
            ai_ml: ["PyTorch", "Hugging Face Transformers", "NLTK", "SpaCy"],
            database: ["PostgreSQL", "SQLAlchemy"],
            devops: ["Docker", "GitHub Actions", "Nginx", "Linux Server"]
        },
        codeSnippet: `async def generate_weekly_summary(batch_id: str, db: Session):
    # 1. Fetch raw documents from async queue
    documents = await document_loader.fetch_batch(batch_id)
    
    # 2. Tokenize and execute distilled summarization model
    embeddings = embedding_engine.encode([doc.content for doc in documents])
    sentiment_scores = sentiment_classifier.predict(embeddings)
    
    # 3. Assemble executive report with anomaly flags
    summary = summarizer.generate_action_points(embeddings, max_tokens=500)
    return ReportResponse(
        summary=summary, 
        sentiment_index=sentiment_scores.mean(),
        processed_count=len(documents)
    )`,
        source_url: "https://github.com/TarikuYe",
        github_url: "https://github.com/TarikuYe",
        demo_url: "#"
    },
    {
        id: 2,
        slug: "qr-studio-generator-platform",
        title: "QR Studio — Custom QR Code Generator & Design Platform",
        subtitle: "A modern, full-stack QR Code Generator and customization platform with vector rendering & analytics.",
        category: "FULL STACK",
        liveBadge: "LIVE SYSTEM",
        metaFooter: "2024 / FULL STACK",
        ctaText: "LIVE DEMO",
        deviceType: "laptop",
        timeline: "3 Months / 2024",
        role: "Full-Stack Engineer & UI/UX Designer",
        client: "Product Launch / Open Source",
        status: "Production Deployed",
        price: 0,
        tech_stack: "REACT, NODE.JS, POSTGRES, CANVAS API",
        techBadges: ["REACT", "NODE.JS", "POSTGRES", "CANVAS API"],
        description: "A modern, full-stack QR Code Generator and customization platform that enables users to create high-resolution custom vector QR codes (SVG, PNG, EPS) with custom branding, analytics, and dynamic redirect capabilities.",
        overview: "QR Studio is a professional-grade design utility and redirect engine. Unlike generic generators that produce pixelated outputs, QR Studio renders pixel-perfect vector geometry with customizable gradient eye patterns, embedded brand emblems, error-correction tuning, and real-time scan analytics. Built to handle enterprise marketing campaigns and contactless operations.",
        impactStats: [
            { value: "4K+", label: "Vector QR Exports" },
            { value: "100%", label: "Lossless Scalability (SVG)" },
            { value: "60 FPS", label: "Real-time Canvas Rendering" },
            { value: "< 50ms", label: "Dynamic Redirect Speed" }
        ],
        challenges: [
            "Generating crisp mathematical SVG vectors on-the-fly while supporting complex custom gradients and embedded central logos.",
            "Guaranteeing scan reliability and error correction thresholds across varying mobile camera qualities.",
            "Handling high-frequency dynamic redirect tracking without adding latency to the end-user."
        ],
        solutions: [
            "Created an optimized HTML5 Canvas and SVG drawing engine with real-time Reed-Solomon error correction feedback.",
            "Implemented dynamic short-link routing backed by Redis and PostgreSQL connection pooling.",
            "Designed a dark-mode first, studio-grade UI with live preview and multi-format export presets."
        ],
        architecture: "React frontend with custom WebGL/Canvas render hooks, communicating with an Express/Node.js API gateway connected to PostgreSQL for analytics and dynamic redirect metadata.",
        keyFeatures: [
            {
                title: "Custom Styling & Eye Patterns",
                description: "Extensive control over body dots, corner squares, color gradients, and brand logo embedding."
            },
            {
                title: "Lossless Vector Formats",
                description: "Instant export to SVG, high-DPI PNG, and print-ready EPS formats for large-scale physical media."
            },
            {
                title: "Dynamic Links & Analytics",
                description: "Update destination URLs post-printing while tracking scan volume, geolocation, and device types."
            },
            {
                title: "Pre-Configured Presets",
                description: "One-click templates for Wi-Fi credentials, vCards, event passes, and cryptocurrency wallets."
            }
        ],
        techDetails: {
            frontend: ["React.js", "Tailwind CSS", "HTML5 Canvas API", "Lucide React"],
            backend: ["Node.js", "Express.js", "RESTful Architecture"],
            ai_ml: [],
            database: ["PostgreSQL", "Redis"],
            devops: ["Vercel", "Render", "Postman"]
        },
        codeSnippet: `export const renderVectorQR = ({ data, colorScheme, logoUrl, errorCorrection }) => {
    const qrMatrix = QRCodeGenerator.createMatrix(data, { errorCorrection: 'H' });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Draw custom smooth corner nodes
    applyGradientShading(ctx, colorScheme);
    drawCustomEyeModules(ctx, qrMatrix.getEyes());
    
    if (logoUrl) {
        compositeCenterEmblem(ctx, logoUrl, canvas.width / 2, canvas.height / 2);
    }
    return canvas.toDataURL('image/png');
};`,
        source_url: "https://github.com/TarikuYe",
        github_url: "https://github.com/TarikuYe",
        demo_url: "#"
    },
    {
        id: 3,
        slug: "tourism-management-sentiment-analysis",
        title: "Web & Android Tourism Management with Sentiment Analysis",
        subtitle: "Integrated tourism ecosystem with AI-powered review sentiment analysis for Wolkite Town.",
        category: "FULL STACK / AI",
        liveBadge: "17+ / WEB + ANDROID",
        metaFooter: "2024 / FULL STACK",
        ctaText: "CASE STUDY",
        deviceType: "desktop",
        timeline: "5 Months / 2024",
        role: "Full-Stack System Architect & ML Lead",
        client: "Wolkite Municipality Tourism Bureau",
        status: "Completed & Evaluated",
        price: 0,
        tech_stack: "REACT, FASTAPI (NLP), POSTGRESQL, FIREBASE / ANDROID",
        techBadges: ["REACT", "FASTAPI (NLP)", "POSTGRESQL", "FIREBASE / ANDROID"],
        description: "A full-stack tourism management and review analytics platform developed for Wolkite Town. Features tourist destination booking, feedback sentiment classification with fine-tuned multilingual BERT model, and automated hotel/service rating.",
        overview: "Developed as an end-to-end regional digital transformation initiative for Wolkite Town, Ethiopia. The system bridges local tourism administration, hospitality businesses, and international/domestic travelers. It features an interactive administrative web portal for regional authorities, coupled with an AI-driven feedback engine that classifies tourist reviews into actionable satisfaction indices.",
        impactStats: [
            { value: "17+", label: "Destinations & Hotspots" },
            { value: "91.8%", label: "NLP Classification F1-Score" },
            { value: "100%", label: "Bilingual (English & Amharic)" },
            { value: "3x", label: "Faster Booking Inquiries" }
        ],
        challenges: [
            "Analyzing mixed-language (English and Amharic) visitor reviews with low-resource training datasets.",
            "Synchronizing live booking queries and hotel capacities between the Android client and admin web portal.",
            "Designing an intuitive dashboard for non-technical municipal administrators to monitor hospitality KPIs."
        ],
        solutions: [
            "Trained and fine-tuned a multilingual transformer model capable of sentiment classification across dialect nuances.",
            "Architected a centralized PostgreSQL relational schema with role-based access control (Admins, Hotels, Tourists).",
            "Deployed an intuitive GIS mapping module with real-time filtering and sentiment breakdown charts."
        ],
        architecture: "Decoupled web and mobile clients interacting with a Python FastAPI microservice for NLP processing, and an Express/PostgreSQL core database server backed by Firebase real-time notifications.",
        keyFeatures: [
            {
                title: "Multilingual Sentiment Analytics",
                description: "Automatically analyzes reviews to compute vendor trust scores and municipal satisfaction indices."
            },
            {
                title: "Destination GIS Mapping",
                description: "Interactive guide covering cultural sites, historical landmarks, eco-tourism spots, and local lodges."
            },
            {
                title: "Android Native Mobile Companion",
                description: "Android application featuring offline bookmarking, GPS navigation, and direct hotel inquiry dispatch."
            },
            {
                title: "Administrative Control Center",
                description: "Comprehensive reporting dashboard for municipal staff to manage verified vendor listings and audit logs."
            }
        ],
        techDetails: {
            frontend: ["React.js", "Tailwind CSS", "Leaflet Maps", "Chart.js"],
            backend: ["FastAPI", "Python", "Node.js", "Express.js"],
            ai_ml: ["Hugging Face Transformers", "Scikit-Learn", "BERT Multilingual"],
            database: ["PostgreSQL", "Firebase Firestore"],
            devops: ["Docker", "Git", "Postman", "Vercel"]
        },
        codeSnippet: `@router.post("/analyze-review", response_model=SentimentResult)
async def analyze_tourist_feedback(review: ReviewSubmission):
    clean_text = preprocess_text(review.comment)
    tokens = tokenizer(clean_text, return_tensors="pt", truncation=True, max_length=256)
    
    with torch.no_grad():
        logits = sentiment_model(**tokens).logits
        probabilities = torch.softmax(logits, dim=1).squeeze()
    
    score = float(probabilities[1] - probabilities[0]) # Positive - Negative
    label = "POSITIVE" if score > 0.2 else ("NEGATIVE" if score < -0.2 else "NEUTRAL")
    
    return SentimentResult(label=label, confidence=float(probabilities.max()), polarity=score)`,
        source_url: "https://github.com/TarikuYe",
        github_url: "https://github.com/TarikuYe",
        demo_url: "#"
    },
    {
        id: 4,
        slug: "digital-menu-restaurant-management",
        title: "Digital Menu System for Hotel & Restaurant",
        subtitle: "Contactless digital dining platform with real-time kitchen order display & inventory management.",
        category: "RESTAURANT TECH",
        liveBadge: "HOSPITALITY TECH",
        metaFooter: "2024 / RESTAURANT TECH",
        ctaText: "SYSTEM OVERVIEW",
        deviceType: "tablet",
        timeline: "3 Months / 2024",
        role: "Full-Stack Developer",
        client: "Hospitality & Restaurant Group",
        status: "Production Ready",
        price: 0,
        tech_stack: "REACT, TAILWIND CSS, POSTGRESQL, SOCKET.IO",
        techBadges: ["REACT", "TAILWIND CSS", "POSTGRESQL", "SOCKET.IO"],
        description: "Interactive food and hospitality order management system replacing traditional paper menus with contactless QR ordering, real-time kitchen display sync, live order status tracking, multilingual multi-currency support, and point-of-sale integration.",
        overview: "A sleek, contactless ordering and table management solution engineered for high-turnover dining establishments and hotel room services. Guests scan table-specific QR codes to browse rich visual menus with ingredient details, allergen filters, and dietary tags. Orders dispatch instantly to the kitchen display system (KDS) via WebSockets, eliminating wait-time and order discrepancies.",
        impactStats: [
            { value: "0 Waiters", label: "Needed for Initial Order" },
            { value: "35%", label: "Faster Table Turnover" },
            { value: "100%", label: "Paperless Operation" },
            { value: "< 200ms", label: "Real-time Order Sync" }
        ],
        challenges: [
            "Ensuring immediate, reliable kitchen ticket synchronization even under unstable restaurant Wi-Fi.",
            "Managing complex menu modifications, customizations, combo deals, and daily inventory depletion.",
            "Designing a seamless, app-free web experience that opens instantly without requiring user registration."
        ],
        solutions: [
            "Implemented resilient WebSocket communication with local fallback polling and sound alerts for kitchen staff.",
            "Constructed a dynamic modifier engine supporting nested toppings, spicy levels, and dietary exclusions.",
            "Optimized client bundle size for sub-second first contentful paint (FCP) on mobile cellular connections."
        ],
        architecture: "Lightweight React single-page guest app with Socket.io duplex communication to an Express backend, managing order states in PostgreSQL with Redis active cart sessions.",
        keyFeatures: [
            {
                title: "Contactless QR Ordering",
                description: "Zero installation required. Instant browser menu loading with automatic table identification."
            },
            {
                title: "Live Kitchen Display System (KDS)",
                description: "Color-coded tickets with preparation timers, audio alerts, and station routing (Bar, Grill, Cold Prep)."
            },
            {
                title: "Dynamic Menu & Modifier Control",
                description: "Live item 86ing (marking out of stock), time-based happy hour pricing, and multi-language support."
            },
            {
                title: "Analytics & Sales Dashboard",
                description: "Reports on popular menu items, peak hours, average preparation times, and server performance."
            }
        ],
        techDetails: {
            frontend: ["React.js", "Tailwind CSS", "Socket.io Client", "Framer Motion"],
            backend: ["Node.js", "Express.js", "Socket.io", "JWT Auth"],
            ai_ml: [],
            database: ["PostgreSQL", "Prisma ORM"],
            devops: ["Render", "Vercel", "Docker"]
        },
        codeSnippet: `// Kitchen Display System WebSocket Order Dispatch
io.on('connection', (socket) => {
    socket.on('submit_guest_order', async (orderData) => {
        const validatedOrder = await orderService.createOrder(orderData);
        
        // Broadcast instant notification to kitchen stations
        io.to(\`station_\${validatedOrder.category}\`).emit('new_kitchen_ticket', {
            orderId: validatedOrder.id,
            table: validatedOrder.tableNumber,
            items: validatedOrder.items,
            timestamp: new Date().toISOString()
        });
        
        socket.emit('order_confirmed', { status: 'PREPARING', etaMinutes: 15 });
    });
});`,
        source_url: "https://github.com/TarikuYe",
        github_url: "https://github.com/TarikuYe",
        demo_url: "#"
    },
    {
        id: 5,
        slug: "kidssoming-android-app",
        title: "Kidssoming Android App for KG Students",
        subtitle: "Interactive phonics & early childhood educational application built with Kotlin and Firebase.",
        category: "MOBILE APP",
        liveBadge: "MOBILE APP",
        metaFooter: "2024 / ANDROID APPS",
        ctaText: "VIEW DETAILS",
        deviceType: "mobile",
        layout: "banner",
        timeline: "3 Months / 2024",
        role: "Mobile App Developer",
        client: "Early Childhood Education Initiative",
        status: "Production Ready",
        price: 0,
        tech_stack: "APPS, KOTLIN, FIREBASE, ROOM DB",
        techBadges: ["APPS", "KOTLIN", "FIREBASE", "ROOM DB"],
        description: "Interactive educational Android learning application designed for Kindergarten students featuring audio-visual phonics, interactive quizzes, offline learning progress, and child-safe interface.",
        overview: "A delightful, child-centric Android educational application designed specifically for Kindergarten and early primary learners. Built in native Kotlin with Android Jetpack components, Kidssoming transforms foundational alphabet literacy, phonetic pronunciation, numbers, and basic cognitive puzzles into an engaging, gamified journey. The app works 100% offline with local Room DB storage while syncing achievements to Firebase when connectivity is available.",
        impactStats: [
            { value: "50+", label: "Interactive Lessons" },
            { value: "100%", label: "Offline Operational" },
            { value: "0", label: "Ads or External Tracking" },
            { value: "60 FPS", label: "Smooth Animation Engine" }
        ],
        challenges: [
            "Designing a zero-text, intuitive navigation system usable by toddlers and non-reading kindergarten students.",
            "Guaranteeing instant audio playback for phonetic letters without stutter or latency on low-end Android hardware.",
            "Complying with strict child privacy standards (COPPA principles) with zero intrusive tracking."
        ],
        solutions: [
            "Created large colorful touch targets with tactile haptic feedback and cheerful auditory cues.",
            "Engineered an efficient local audio caching pipeline utilizing Android SoundPool for zero-latency playback.",
            "Leveraged Android Jetpack Room DB for completely offline persistence of student quiz stars and unlocked rewards."
        ],
        architecture: "MVVM native Android architecture implemented with Kotlin Coroutines, Jetpack Navigation, SoundPool audio player, Room SQLite ORM, and Firebase Cloud Messaging for parental updates.",
        keyFeatures: [
            {
                title: "Phonics & Letter Tracing",
                description: "Multi-sensory letter drawing canvas with stroke detection and pronunciation voiceovers."
            },
            {
                title: "Gamified Quiz Rewards",
                description: "Interactive visual puzzles rewarding students with collectible stars, badges, and cheerful animations."
            },
            {
                title: "Complete Offline Availability",
                description: "All core educational modules, audio files, and illustrations are bundled for zero-data environments."
            },
            {
                title: "Parental Progress Overview",
                description: "Dedicated pin-protected dashboard allowing guardians to track completion rates and learning milestones."
            }
        ],
        techDetails: {
            frontend: ["Kotlin", "Android Jetpack", "XML / Material Design 3", "Lottie Animations"],
            backend: ["Firebase Auth", "Cloud Firestore"],
            ai_ml: [],
            database: ["Android Room DB (SQLite)"],
            devops: ["Android Studio", "Gradle", "Google Play Console"]
        },
        codeSnippet: `class PhonicsAudioPlayer(context: Context) {
    private val soundPool = SoundPool.Builder().setMaxStreams(4).build()
    private val soundMap = HashMap<String, Int>()

    fun loadPhonicsLibrary() {
        val assetManager = context.assets
        listOf("letter_a", "letter_b", "letter_c").forEach { soundName ->
            val descriptor = assetManager.openFd("audio/$soundName.mp3")
            soundMap[soundName] = soundPool.load(descriptor, 1)
        }
    }

    fun playLetterSound(letter: String) {
        soundMap[letter]?.let { soundId ->
            soundPool.play(soundId, 1.0f, 1.0f, 1, 0, 1.0f)
        }
    }
}`,
        source_url: "https://github.com/TarikuYe",
        github_url: "https://github.com/TarikuYe",
        demo_url: "#"
    }
];

export const initialBlogPosts = [
    {
        id: 1,
        title: "Building Scalable AI Systems with Node.js",
        content: "Explore how to integrate large language models into your backend architecture...",
        display_date: "2026-02-28",
        published_date: "2026-02-28",
        read_time: "5 MIN READ",
        image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000"
    },
    {
        id: 2,
        title: "Mastering Tailwind CSS for Complex Dashboards",
        content: "Advanced Tailwind CSS techniques for managing utility-first styles in enterprise applications...",
        display_date: "2026-02-15",
        published_date: "2026-02-15",
        read_time: "8 MIN READ",
        image_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000"
    },
    {
        id: 3,
        title: "The Future of Full-Stack Development",
        content: "How AI-assisted coding is changing the landscape for software engineers in 2026...",
        display_date: "2026-02-01",
        published_date: "2026-02-01",
        read_time: "4 MIN READ",
        image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000"
    }
];

export const aboutMe = {
    bio1: "I'm a Full-Stack Developer and AI Enthusiast passionate about software design and engineering. With 1+ years of experience in full-stack development, I build clean, scalable, and maintainable applications that deliver real-world impact and exceptional user experience.",
    bio2: "I believe great software is more than just code—it's an experience. My approach combines rigorous engineering principles with a designer's eye for detail. I specialize in transforming complex systems and AI-model outputs into intuitive, user-friendly interfaces—while ensuring every solution is scalable, ethical, and performance-driven.",
    yearsExperience: "1+",
    toolkit: {
        languages: ["Python", "JavaScript", "SQL (PostgreSQL)", "HTML/CSS"],
        frontend: ["React.js", "Tailwind CSS"],
        backend: ["Node.js", "Express (Node.js)"],
        other: ["Git", "Docker"]
    },
    education: {
        degree: "B.S. in Computer Science",
        institution: "Wolkite University",
        period: "2021 — 2025"
    }
};
