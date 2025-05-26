import React from 'react';
import '../styles/global.css';
import { useNavigate } from "react-router-dom";

function About() {
    const navigate = useNavigate();
  return (
    <>
      <div className="modal fade" id="aboutModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content bg-dark text-light rounded-4 shadow-lg border border-secondary-subtle about-glow">

            <div className="modal-header border-0">
              <h5 className="modal-title fw-semibold fs-4">About PersonaFied</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body px-4 px-md-5 py-4">
              <div className="container">
                <h2 className="fw-bold text-center mb-3 display-6">Introducing PersonaFied</h2>
                <p className="fs-5 text-center fst-italic opacity-75 mb-4">Explore Who You Could’ve Been.</p>

                <p>
                  <strong>PersonaFied</strong> is a creative self-reflection platform designed for the dreamers,
                  the overthinkers, the seekers — for anyone who’s ever wondered: <br />
                  <em>"What if I had chosen differently?"</em>
                </p>

                <p>
                  At its core, PersonaFied is a digital journaling experience that invites users to explore
                  alternate versions of themselves — not as fantasy, but as emotional reality.
                  Whether it’s <em>“Poet Me,” “Doctor Me,”</em> or <em>“Never-left-Home Me,”</em> these personas
                  help you reconnect with forgotten passions, unresolved what-ifs, and unrealized hopes.
                </p>

                <hr className="border-secondary my-4" />

                <h4 className="fw-bold mt-4">✨ What You Can Do in PersonaFied:</h4>
                <ul className="fs-6 lh-lg">
                  <li><strong>▸ Create Alternate Selves</strong><br />
                    Craft personas based on missed chances, untold stories, or traits you never explored.
                  </li>
                  <li><strong>▸ Journal in Their Voice</strong><br />
                    Write journal entries as that version of yourself — their regrets, their joy, their day.
                  </li>
                  <li><strong>▸ Explore Through Prompts</strong><br />
                    Guided prompts unlock deeper emotional truths hidden in these alternate selves.
                  </li>
                  <li><strong>▸ Visual Identity</strong><br />
                    Give your personas a face, a vibe, a quote — like ambient fragments of memory.
                  </li>
                  <li><strong>▸ Archive & Reflect</strong><br />
                    Toggle between personas and discover what connects or divides them.
                  </li>
                </ul>

                <hr className="border-secondary my-4" />

                <h4 className="fw-bold mt-4">🎨 Aesthetic & Atmosphere</h4>
                <p>
                  PersonaFied is minimalist, moody, and emotionally immersive. The homepage invites curiosity with
                  subtle animations and poetic cues like:
                </p>
                <p className="fst-italic">
                  “What if... you chose differently?” <br />
                  “Would you recognize yourself?”
                </p>
                <p>
                  Everything is designed to feel like stepping into a mirror-world of introspection.
                </p>

                <hr className="border-secondary my-4" />

                <h4 className="fw-bold mt-4">🔑 Who It’s For</h4>
                <ul className="lh-lg">
                  <li>Writers and creatives seeking introspection</li>
                  <li>Students and professionals at a crossroads</li>
                  <li>Anyone exploring their identity, purpose, or past</li>
                  <li>Therapists and coaches looking for journaling tools</li>
                  <li>Humans being human</li>
                </ul>

                <hr className="border-secondary my-4" />

                <h4 className="fw-bold mt-4">🛸 The Philosophy</h4>
                <p>
                  PersonaFied doesn’t ask you to escape reality — it invites you to honor every version of yourself.
                </p>
                <p>
                  Every unchosen path leaves an echo, and every echo has something to say.
                </p>
                <p className="fw-semibold fs-5 text-center mt-4">
                  Because <em>“You are more than one story.”</em>
                </p>
              </div>
            </div>

            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-outline-light rounded-pill px-4"
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
