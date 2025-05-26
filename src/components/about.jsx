import React from 'react';
import '../../styles/global.css';

function About(){
    return(
        <>
     <div className="modal fade" id="aboutModal" tabIndex="-1" aria-hidden="true">
  <div className="modal-dialog modal-lg modal-dialog-scrollable">
    <div className="modal-content bg-black text-white shadow-lg rounded-3">
      <div className="modal-header border-0">
        <h5 className="modal-title">About Personafied</h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>

      <div className="modal-body">
        <div className="container py-5">
          <h2 className="fw-bold text-center mb-4">Introducing PersonaFied</h2>
          <p className="fs-5 text-center fst-italic">Explore Who You Could’ve Been.</p>

          <p>
            <strong>PersonaFied</strong> is a creative self-reflection platform designed for the dreamers,
            the overthinkers, the seekers — for anyone who’s ever wondered: <br />
            <em>"What if I had chosen differently?"</em>
          </p>

          <p>
            At its core, PersonaFied is a digital journaling experience that invites users to explore
            alternate versions of themselves — not as fantasy, but as emotional reality. Each “persona”
            is a life you didn’t live, a version of you shaped by different choices, dreams, and detours.
            Whether it’s <em>“Poet Me,” “Doctor Me,”</em> or <em>“Never-left-Home Me,”</em> these personas
            help you reconnect with forgotten passions, unresolved what-ifs, and unrealized hopes.
          </p>

          <hr className="border-secondary" />

          <h4 className="fw-bold mt-4">✨ What You Can Do in PersonaFied:</h4>
          <ul className="fs-6">
            <li><strong>▸ Create Alternate Selves</strong><br />
              Craft and name personas based on paths you didn’t take — career switches, missed chances,
              untold stories, or even personality traits you never explored.
            </li>
            <br />
            <li><strong>▸ Journal in Their Voice</strong><br />
              Each persona becomes a living diary. Write journal entries as that version of yourself.
              How do they feel? What does their day look like? What do they regret or cherish?
            </li>
            <br />
            <li><strong>▸ Explore Through Prompts</strong><br />
              Get guided reflection prompts tailored to the persona you’re journaling as — helping you
              uncover emotions, desires, and insights that may surprise you.
            </li>
            <br />
            <li><strong>▸ Visual Identity</strong><br />
              Add profile images, vibes, and even quote fragments that reflect each persona’s mood or
              philosophy. (Think: ambient poetry, moodboards, little aesthetic bites of self.)
            </li>
            <br />
            <li><strong>▸ Archive & Reflect</strong><br />
              Toggle between personas and observe patterns. What connects them? Where do they diverge?
              What does that say about who you are — and who you’re still becoming?
            </li>
          </ul>

          <hr className="border-secondary" />

          <h4 className="fw-bold mt-4">🎨 Aesthetic & Atmosphere</h4>
          <p>
            The PersonaFied interface is minimalist, moody, and emotionally immersive. The homepage
            invites curiosity without revealing too much, preserving the mystery and personal nature
            of the journey ahead.
          </p>
          <p>
            Teaser words and subtle scroll animations ask questions like:
            <br /> <em>“What if... you chose differently?”</em><br />
            <em>“Would you recognize yourself?”</em>
          </p>
          <p>
            Everything is designed to feel like stepping into a dream-space — a mirror-world of
            self-reflection.
          </p>

          <hr className="border-secondary" />

          <h4 className="fw-bold mt-4">🔑 Who It’s For</h4>
          <ul>
            <li>Writers and creatives seeking introspection</li>
            <li>Students and professionals at a crossroads</li>
            <li>Anyone exploring their identity, purpose, or past</li>
            <li>Therapists and coaches looking for journaling tools</li>
            <li>Humans being human</li>
          </ul>

          <hr className="border-secondary" />

          <h4 className="fw-bold mt-4">🛸 The Philosophy</h4>
          <p>
            PersonaFied doesn’t ask you to escape reality — it asks you to honor the complexity of who
            you are. Every unchosen path leaves an echo, and every echo has something to say.
          </p>
          <p>
            Through creative self-inquiry, you’ll learn that you’re not just one story. You’re many.
          </p>
          <p className="fw-semibold fs-5 text-center mt-4">Because <em>“You are more than one story.”</em></p>
        </div>
      </div>

      <div className="modal-footer border-0">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</div>


        </>
    );
}

export default About;